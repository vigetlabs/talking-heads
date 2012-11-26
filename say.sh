#!/bin/bash

MESSAGE=$(php -r "echo urlencode(\"$1\");")

curl --data "" http://localhost:3000/say?message=$MESSAGE

say "$1" -v "$2"

curl --data "" http://localhost:3000/shutup
