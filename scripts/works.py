#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
from google.appengine.ext import db

from google.appengine.ext import webapp
from google.appengine.ext.webapp import util
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp.util import run_wsgi_app
from config import config

import logging
import models
import os
import re
import math

class MainHandler(webapp.RequestHandler):
    def get(self):
		self.d = {}
		path = os.path.join(os.path.dirname(__file__), '../templates/works/home.html')
		self.response.out.write(template.render(path,{'data':self.d}))

def breakdown_work(text,type):  
	text_copy = text
	if type == 'poem':
		pass
	else:
		text_copy = text.replace('\n', '')
 		pattern = re.compile(r'(\w+[^\.!?]*[\.!?])', re.M)
		sentences = pattern.findall(text_copy)
		logging.info(sentences)
	return sentences
		
class Enter(webapp.RequestHandler):
	def get(self):
		if not hasattr(self, 'd'):
			self.d = {}
		path = os.path.join(os.path.dirname(__file__), '../templates/works/enter.html')
		self.response.out.write(template.render(path,{'data':self.d}))
		
	def post(self):
		#this is where we check the text they enter
		works = models.Works()
		works.text = self.request.get('words')
		works.works_type = self.request.get('type')
		works.name = self.request.get('name')
		sentences = breakdown_work(works.text,works.works_type)
		works.sentence_length = len(sentences)
		sent_list = []
		works.put()
		
		# for counting
		current_sentence = 0
		sentence_tally = works.sentence_length
		
		
		wspace_pattern = re.compile(r'\s+')
		for sentence in sentences:
			
			# split sentence if too long
			# max sentence length == 10 for now
			sentence = sentence.strip()
			words = wspace_pattern.split( sentence )
			
			word_count = len( words )
			if word_count > 0 and word_count <= 10:				
				new_sent = models.Sentences()
				new_sent.words = sentence
				new_sent.work = works
				new_sent.sentence_index = current_sentence
				
				# get a correct sentence index for this fragment
				current_sentence += 1
				
				# append the sentence to the list
				sent_list.append(new_sent)
			elif word_count != 0:
				# add one to make it an accurate count
				number_of_groups = word_count / 10 + 1
				if word_count % 10 == 0:
					number_of_groups -= 1
				
				# correct sentence tally for this work in the database
				sentence_tally += ( number_of_groups - 1 )
				
				# push split sentence - only works for sentences under 20 words 
				# ( if there are more, then the second sentence will be longer than 10 words )
				for i in range( number_of_groups ):
					new_sent = models.Sentences()
					new_sent.words = " ".join( words[(i*10):(i*10)+10] )
					new_sent.work = works
					sent_list.append( new_sent )
					
					# get a correct sentence index for this fragment
					new_sent.sentence_index = current_sentence
					current_sentence += 1
					
				# endfor
			#endif
		#endfor
		works.sentence_length = sentence_tally
		works.put()
		db.put(sent_list)
		#self.d['response']
		self.d = {'response':'Success'}
		Enter.get(self)
	#enddef


class Works(webapp.RequestHandler):
	def get(self):
		#if not hasattr(self, 'd'):
		self.d = {}
		
		self.d['works'] = models.Works.all()
			
		path = os.path.join(os.path.dirname(__file__), '../templates/works/home.html')
		self.response.out.write(template.render(path,{'data':self.d}))
	#enddef

class View(webapp.RequestHandler):
	def get(self):
		self.d = {}		
		work_id = self.request.get('id',None)
		if work_id is not None:
			self.d['work'] = models.Works.get_by_id(int(work_id))
			if self.d['work'] is not None:
				self.d['sentences'] = models.Sentences.all().filter('work =',self.d['work']).order('sentence_index')
				self.d['num_unprocessed_sentences'] = models.Sentences.all().filter('work =',self.d['work']).filter('finished =',False).count()#.order('sentence_index')
				if self.d['num_unprocessed_sentences'] == 0 and self.d['work'].full_recording is None:
					from google.appengine.api.labs import taskqueue
					try:
						#taskqueue.Queue('process').add(taskqueue.Task(url='/background/process', params={'id':int(work_id)}))
						pass
					except Exception, e:
						logging.error(e)						
					
				logging.info(self.d['sentences'])
				path = os.path.join(os.path.dirname(__file__), '../templates/works/view.html')
				self.response.out.write(template.render(path,{'data':self.d}))
			else:
				self.redirect('/works/')
		else:
			self.redirect('/works/')

class Sentences(webapp.RequestHandler):
	def get(self):
		self.d = {}
		sentence_id = self.request.get('sentence_id',None)
		if sentence_id is None:
			self.redirect('/works/view')
		else:
			try:
				self.d['sentence'] = models.Sentences.get_by_id(int(sentence_id))
			except Exception, e:
				self.redirect('/works/view')
			if self.d['sentence'] is not None:
				self.d['sentences'] = models.RecordingSentence.all().filter('sentence = ',self.d['sentence'])
				path = os.path.join(os.path.dirname(__file__), '../templates/works/sentences.html')
				self.response.out.write(template.render(path,{'data':self.d}))
				
			else:
				self.redirect('/works/view')
def main():
    application = webapp.WSGIApplication([('/works/', Works)
											,('/works/view',View)
											,('/works/enter',Enter)
											,('/works/sentences',Sentences)],
                                         debug=True)
    util.run_wsgi_app(application)


if __name__ == '__main__':
    main()
