require 'sinatra'
require 'sinatra/activerecord'
require './config/environments'

require './app/models/imp'

use Rack::Auth::Basic, "Restricted Area" do |username, password|
  username == 'wichtel' and password == 'wichtelmeister'
end

get '/' do
  File.read 'public/dist/index.html'
end

get '/api/imps' do
  content_type :json
  { imps: Imp.all }.to_json
end

post '/api/imps' do
  content_type :json

  params = JSON.parse request.body.read

  imp = Imp.new params["imp"]
  if imp.save
    { imp: imp }.to_json
  else
    status 422
    { errors: imp.errors }.to_json
  end
end
