#!/bin/bash

bundle check || bundle install --jobs 20 --retry 3
./bin/rails db:setup
rm -f tmp/pids/server.pid && ./bin/rails s -p 3000 -b 0.0.0.0
