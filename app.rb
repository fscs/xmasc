require 'sinatra'
require 'sinatra/activerecord'
require './config/environments'

require './app/models/imp'

get '/' do
  File.read 'public/dist/index.html'
end

get '/imps' do
  Imp.all
end
