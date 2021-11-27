#!/bin/sh

mongoimport --db customerdb --collection customers --type json --file customerdata.json --jsonArray --uri "mongodb://mongo:27017"
mongoimport --db productdb --collection products --type json --file productdata.json --jsonArray --uri "mongodb://mongo:27017"