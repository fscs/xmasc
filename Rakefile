require './app'
require 'sinatra/activerecord/rake'

task default: :build

desc "Build frontend and automatically watch for changes in the source files"
task :build do
  Dir.chdir "public" do
    sh "node_modules/ember-cli/bin/ember build --watch"
  end
end
