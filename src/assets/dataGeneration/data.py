# ref: https://www.studytonight.com/python-howtos/how-to-read-xml-file-in-python#:~:text=To%20read%20an%20XML%20file,XML%20file%20using%20getroot()%20.

# #for beautifulsoup
# pip install beautifulsoup4

# #for lmxl parser
# pip install lxml

from bs4 import BeautifulSoup 
import random 
import json
# move flies for db
import shutil
import os

## preprocess data
print("preprocessing data...")

# working on venue
# filter venue without latitude and longitude data
with open('venue.xml', 'r') as f:
    data = f.read() 

venue_data = BeautifulSoup(data, 'xml')
tags_remain = ["venuee", "latitude", "longitude"]
venues = venue_data.find_all('venue')

for venue in venues:
    child_tags = venue.find_all()
    for tag in child_tags:
        if tag.name not in tags_remain:
            tag.decompose()
        if tag.name == "latitude" and tag.text.strip() == "":
            venue.decompose()
        if tag.name == "longitude" and tag.text.strip() == "":
            venue.decompose()

filtered_venue = BeautifulSoup(venue_data.encode_contents(), 'xml')

with open('venue_processed.xml', 'w') as f:
    f.write(str(filtered_venue))

# working on event
# filter event without sufficient data
with open('event.xml', 'r') as f:
    data = f.read() 

event_data = BeautifulSoup(data, 'xml') 
tags_remain = ["titlee", "venueid", "progtimee", "desce", "presenterorge", "pricee"]
events = event_data.find_all('event')

for event in events:
    child_tags = event.find_all()
    for tag in child_tags:
        if tag.name not in tags_remain:
            tag.decompose()
        if tag.name == "titlee" and tag.text.strip() == "":
            event.decompose()
        if tag.name == "progtimee" and tag.text.strip() == "":
            event.decompose()

filtered_event = BeautifulSoup(event_data.encode_contents(), 'xml')

with open('event_processed.xml', 'w') as f:
    f.write(str(filtered_event))

# Pick venues to be shown in your app (where each should host at least 3 events)
# set venue id to first three characters (cuz having multiple id with same location)
with open('event_processed.xml', 'r') as f:
    data = f.read() 
filtered_event = BeautifulSoup(data, 'xml')
with open('venue_processed.xml', 'r') as f:
    data = f.read() 
filtered_venue = BeautifulSoup(data, 'xml')

venueIDs = {}
for venue in filtered_venue.find_all('venue'):
    venueid = venue['id']
    if venueid:
        venueIDs.setdefault(venueid, [])
        for event in filtered_event.find_all('event'):
            event_venueid = event.find('venueid')
            if event_venueid and event_venueid.text.strip() == venueid:
                eventid = event['id']
                if eventid:
                    venueIDs[venueid].append(eventid)
venueIDs = {key: value for key, value in venueIDs.items() if len(value) > 3}

# Pick 10 random events from the selected venues
selectedVenue = random.sample(list(venueIDs.keys()), 10)

# Pick all the dates of the selected events
with open('programDates.xml', 'r') as f:
    data = f.read()

filtered_programDates = []
selectedVenue_Dates = []
programDates_data = BeautifulSoup(data, 'xml')
for x in selectedVenue:
    for y in venueIDs[x]: # events
        events = programDates_data.find_all('event')
        for event in events:
            if event and event['id'] == y:
                filtered_programDates.append(event)

filtered_programDates_xml = BeautifulSoup(features="xml")
root = filtered_programDates_xml.new_tag('root')
filtered_programDates_xml.append(root)

for event in filtered_programDates:
    root.append(event)

with open('programDates_processed.xml', 'w') as f:
    f.write(str(filtered_programDates_xml))

# Save all venue and event ids to result.txt 
result = ""
filtered_venue = [venue for venue in venue_data.find_all('venue') if venue['id'] in selectedVenue]
for f in filtered_venue:
    for e in venueIDs[f['id']]:
        result += f['id'] + " "
        result += e + "\n"

with open('result.txt', 'w') as f:
    f.write(str(result))

# deafult JSON for one event data
with open('preset_event.json', 'r') as f:
    events = json.load(f)

data = []
with open('result.txt', 'r') as file:
    for line in file:
        venue_id, event_id = line.strip().split()
        data.append((venue_id, event_id))

with open('event_processed.xml', 'r') as f:
    event_data = f.read() 
event_data = BeautifulSoup(event_data, 'xml') 
with open('venue_processed.xml', 'r') as f:
    venue_data = f.read()
venue_data = BeautifulSoup(venue_data, 'xml') 
with open('programDates_processed.xml', 'r') as f:
    programDates_data = f.read()
programDates_data = BeautifulSoup(programDates_data, 'xml')

result_data = []
for d in data:
    venue_id, event_id = d
    dates = []
    event = event_data.find(id=event_id)
    venue = venue_data.find(id=venue_id)
    programDate = programDates_data.find(id=event_id)
    for x in programDate.find_all():
        dates.append(x.text)
    events = {
        "eventID": event_id,
        "title": event.find('titlee').text,
        "progtimee": event.find('progtimee').text,
        "date" : dates,
        "venue": {
            "venueID": venue_id,
            "address": venue.find('venuee').text,
            "latitude": venue.find('latitude').text,
            "longitude": venue.find('longitude').text,
        },
        # null allowed here
        "price": event.find('pricee').text if event.find('pricee').text else "no details", 
        "description": event.find('desce').text if event.find('desce').text else "no details",
        "presenterorge": event.find('presenterorge').text if event.find('presenterorge').text else "no details"
    }
    result_data.append(events)
    
print("Done with event.json")

# done here
with open('event.json', 'w') as file:
    json.dump(result_data, file, indent=4)

if os.path.isfile('../data/event.json'):
    os.remove('../data/event.json')

source_file = './event.json'
destination_folder = '../data/'
shutil.move(source_file, destination_folder)

# deafult JSON for one venue data
with open('preset_venue.json', 'r') as f:
    events = json.load(f)

data = []
with open('result.txt', 'r') as file:
    for line in file:
        venue_id, event_id = line.strip().split()
        data.append((venue_id, event_id))


result_data = []
for s in selectedVenue:
    venue_id = s
    venue = venue_data.find(id=venue_id)
    events = []

    for venueid, eventid in data:
        if (s == venueid):
            events.append(eventid)

    venues = {
        "venueID": venue_id,
        "address": venue.find('venuee').text,
        "latitude": venue.find('latitude').text,
        "longitude": venue.find('longitude').text,
        "events": events
    }
    result_data.append(venues)
    
print("Done with venue.json")

# done here
with open('venue.json', 'w') as file:
    json.dump(result_data, file, indent=4)

if os.path.isfile('../data/venue.json'):
    os.remove('../data/venue.json')

source_file = './venue.json'
destination_folder = '../data/'
shutil.move(source_file, destination_folder)