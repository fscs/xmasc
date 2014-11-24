require 'yaml'
require 'pry'

config = YAML.load_file('database.yml')

configure :development do
  ActiveRecord::Base.establish_connection(
    adapter: config["development"]["adapter"],
    database: config["development"]["database"]
  )

  set :public_folder, Proc.new { File.join root, "public/dist" }
end
