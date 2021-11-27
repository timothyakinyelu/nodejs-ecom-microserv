#!/bin/sh

mongoimport --db customerdb --collection customers --type json --file customerdata.json --jsonArray --uri "mongodb://mongo:27017"