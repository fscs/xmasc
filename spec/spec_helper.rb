require './app'
require 'rspec'
require 'rack/test'
require 'factory_girl'

ENV['RACK_ENV'] ||= 'test'

Dir[File.join(Sinatra::Application.root, "spec/support/**/*.rb")].each { |f| require f }

RSpec.configure do |config|
  config.include Rack::Test::Methods

  config.order = "random"

  FactoryGirl.definition_file_paths = [File.join(Sinatra::Application.root, "spec/factories")]
  FactoryGirl.find_definitions
end
