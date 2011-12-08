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
from google.appengine.ext import webapp
from google.appengine.ext.webapp import util
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp.util import run_wsgi_app

import os


class MainHandler(webapp.RequestHandler):
    def get(self):
		self.d = {}
		path = os.path.join(os.path.dirname(__file__), '../templates/static/home.html')
		self.response.out.write(template.render(path,{'data':self.d}))

class Assignments(webapp.RequestHandler):
	def get(self):
		self.redirect('/assignments/')

	def post(self):
		#email, password
		pass

class Project(webapp.RequestHandler):
	def get(self):
		self.redirect('/project/')

	def post(self):
		#email, password
		pass

class Resources(webapp.RequestHandler):
	def get(self):
		self.redirect('/resources/')

	def post(self):
		#email, password
		pass

class Contact(webapp.RequestHandler):
	def get(self):
		self.redirect('/contact/')

	def post(self):
		#email, password
		pass


def main():
    application = webapp.WSGIApplication([('/', MainHandler)
										,('/assignments', Assignments)
										,('/project', Project)
										,('/resources', Resources)
										,('/contact', Contact)],
                                         debug=True)
    util.run_wsgi_app(application)


if __name__ == '__main__':
    main()
