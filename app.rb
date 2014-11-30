require 'sinatra'
require 'sinatra/activerecord'
require 'action_mailer'
require './config/environments'

require './app/models/imp'
require './app/mailer/imp'
require './app/helpers'

get '/' do
  File.read 'public/dist/index.html'
end

get '/api/imps' do
  content_type :json
  { imps: Imp.all }.to_json
end

post '/api/imps' do
  protect!

  content_type :json

  params = JSON.parse request.body.read

  imp = Imp.new params["imp"]
  if imp.save
    send_welcome_mail_to imp
    { imp: imp }.to_json
  else
    status 422
    { errors: imp.errors }.to_json
  end
end

get '/authenticate' do
  protect!

  %w({"success": true})
end

def send_welcome_mail_to imp
  ImpMailer.welcome(imp.name, imp.email).deliver
end
