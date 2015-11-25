#!/bin/sh

. ./.env
bundle exec puma -C puma.rb
