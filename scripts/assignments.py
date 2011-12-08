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

import logging
import models
import os
import re
import math

class MainHandler(webapp.RequestHandler):
    def get(self):
		self.d = {}
		
		path = os.path.join(os.path.dirname(__file__), '../templates/assignments/index.html')
		self.response.out.write(template.render(path,{'data':self.d}))
		

	# def post(self):
	# 	#this is where we check the text they enter
	# 	# testModel = models.PostTest()
	# 	# 	testModel.testdata = self.request.get('testdata')
	# 	# 
	# 	# 	testModel.put()
	# 	# db.put(sent_list)
	# 	#self.d['response']
	# 	self.d = {'response':'Success'}
	# 	MainHandler.get(self)
	# #enddef
class Homework(webapp.RequestHandler):
	def get(self):
		self.d = {}
		
		path = os.path.join(os.path.dirname(__file__), '../templates/assignments/index.html')
		self.response.out.write(template.render(path,{'data':self.d}))

class Homework2(webapp.RequestHandler):
	def get(self):
		self.d = {}
		
		path = os.path.join(os.path.dirname(__file__), '../templates/assignments/hw2/main.html')
		self.response.out.write(template.render(path,{'data':self.d}))
		
class Homework3(webapp.RequestHandler):
	def get(self):
		self.d = {}

		path = os.path.join(os.path.dirname(__file__), '../templates/assignments/hw3/main.html')
		self.response.out.write(template.render(path,{'data':self.d}))

class Homework4(webapp.RequestHandler):
	def get(self):
		self.d = {}

		path = os.path.join(os.path.dirname(__file__), '../templates/assignments/hw4/main.html')
		self.response.out.write(template.render(path,{'data':self.d}))
		
class Exercise_VoiceOver(webapp.RequestHandler):
	def get(self):
		self.d = {}
		
		path = os.path.join(os.path.dirname(__file__), '../templates/assignments/exercise_voiceover/main.html')
		self.response.out.write(template.render(path,{'data':self.d}))

class Exercise_Temperature(webapp.RequestHandler):
	def get(self):
		self.d = {}
		
		path = os.path.join(os.path.dirname(__file__), '../templates/assignments/exercise_temperature/main.html')
		self.response.out.write(template.render(path,{'data':self.d}))


def main():
    application = webapp.WSGIApplication([('/assignments/', MainHandler),
										('/assignments/homework/', Homework),
										('/assignments/homework/2/', Homework2),
										('/assignments/homework/3/', Homework3),
										('/assignments/homework/4/', Homework4),
										('/assignments/exercise/voiceover/', Exercise_VoiceOver),
										('/assignments/exercise/temperature/', Exercise_Temperature)],
                                         debug=True)
    util.run_wsgi_app(application)


if __name__ == '__main__':
    main()
