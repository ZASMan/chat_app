#!/bin/bash

docker-compose run --rm -e RAILS_ENV=test app rspec spec
