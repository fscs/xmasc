require './app'
require 'sinatra/activerecord/rake'

task default: "xmasc:build"

namespace :xmasc do
  desc "Build frontend and automatically watch for changes in the source files"
  task :build do
    Dir.chdir "public" do
      sh "node_modules/ember-cli/bin/ember build --watch"
    end
  end

  desc "roll a random distribution for all calendars"
  task :roll do
    Roller.roll
  end
end

namespace :db do
  namespace :xmasc do
    desc "Truncates imps from db"
    task :truncate_imps do
      Imp.delete_all
    end
  end
end
