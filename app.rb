require 'sinatra'
require 'sinatra/activerecord'
require './config/environments'

require './app/models/imp'

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

  imp = Imp.create params["imp"]
  imp.save
  imp.to_json
end
