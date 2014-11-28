require './app'
require 'sinatra/activerecord/rake'

task default: :build

task :build do
  Dir.chdir "public" do
    sh "node_modules/ember-cli/bin/ember build --watch"
  end
end
