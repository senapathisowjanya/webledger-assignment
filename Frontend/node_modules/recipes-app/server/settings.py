#!/usr/bin/env python

import os
import pymongo

if os.environ.get('HOST'):

    # Service Configuration
    SERVER_NAME = os.environ.get('HOST')

# Default MongoDB Configuration.
MONGO_HOST   = 'localhost'
MONGO_PORT   = 27017
MONGO_DBNAME = 'recipes'

# Parse the `MONGOHQ_URL` variables into the required Eve constants.
host = os.environ.get('MONGOHQ_URL', 'mongodb://%s:%d' % (MONGO_HOST, MONGO_PORT))

if host is not None:

    host = pymongo.uri_parser.parse_uri(host)
    port = int(host['nodelist'][0][1])

    # Mongo Configuration
    MONGO_HOST = host['nodelist'][0][0]
    MONGO_PORT = port if port else MONGO_PORT

    if host['database']:
        MONGO_DBNAME = host['database']

    if host['username']:
        MONGO_USERNAME = host['username']

    if host['password']:
        MONGO_PASSWORD = host['password']

# MongoDB Debug Output.
print " * Using MongoDB: mongodb://%s:%d/%s" % (MONGO_HOST, MONGO_PORT, MONGO_DBNAME)

if host['username'] and host['password']:

    # MongoDB Credentials
    print " * Credentials: %s:%s" % (host['username'], host['password'])

# Schema Details
recipes = {

    'resource_methods': ['GET', 'POST'],
    'item_methods':     ['GET', 'DELETE'],
    'schema': {
        'name': {
            'type': 'string',
            'minlength': 3,
            'maxlength': 32,
            'required': True,
            'unique': True
        },
        'description': {
            'type': 'string',
            'required': False,
            'unique': False
        },
        'ingredients': {
            'type': 'list',
            'required': True,
            'unique': False
        }
    }
}

# API Configuration
DOMAIN    = {'recipes': recipes}
X_DOMAINS = '*'
IF_MATCH  = False

print " * ---"