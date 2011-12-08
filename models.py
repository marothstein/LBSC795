from google.appengine.ext import db

class ExpandoTimestamps(db.Expando):
	create_at=db.DateTimeProperty(auto_now_add=True)
	update_at=db.DateTimeProperty(auto_now=True)

class AEDLocations(ExpandoTimestamps):
	lat = db.StringProperty()
	lon = db.StringProperty()
	loc_in_building = db.StringProperty()
	description = db.StringProperty()
	phone_number = db.StringProperty()
	address = db.StringProperty()
	floor_in_building = db.StringProperty()
	picture = db.BlobProperty()
	
	
	# 
	# class Recordings(ExpandoTimestamps):
	# 	call_sid = db.StringProperty()
	# 	from_number = db.StringProperty()
	# 	to_number = db.StringProperty()
	# 	call_status = db.StringProperty()
	# 	direction = db.StringProperty()
	# 	recording_url = db.StringProperty()
	# 	recording_duration = db.StringProperty()
	# 
	# class Sentences(ExpandoTimestamps):
	# 	work = db.ReferenceProperty(Works)
	# 	words = db.StringProperty()
	# 	sentence_index = db.IntegerProperty()
	# 	sentence_length = db.IntegerProperty()
	# 	finished = db.BooleanProperty(default = False)
	# 	recording = db.ReferenceProperty(Recordings)
	# 
	# class RecordingSentence(ExpandoTimestamps):
	# 	sentence = db.ReferenceProperty(Sentences)
	# 	recording = db.ReferenceProperty(Recordings)
	# 	votes = db.IntegerProperty(default = 0)
	# 
	# class Users(ExpandoTimestamps):
	# 	email = db.StringProperty()
	# 	phone_number = db.StringProperty()
	# 	password = db.StringProperty()
	# 
	