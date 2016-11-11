require 'yaml'

configure :development, :production do
  set :public_folder, Proc.new { File.join root, "public/dist" }

  ActionMailer::Base.view_paths = File.join Sinatra::Application.root, "app/views"
end

configure :development do
  config = YAML.load_file('config/database.yml')["development"]
  ActiveRecord::Base.establish_connection(
    adapter: config["adapter"],
    database: config["database"]
  )

  ActionMailer::Base.delivery_method = :file
  ActionMailer::Base.file_settings = {
    location: File.join(Sinatra::Application.root, "tmp/mails")
  }
end

configure :production do
  ActionMailer::Base.delivery_method = :smtp
  ActionMailer::Base.smtp_settings = {
    address: ENV["XMASC_SMTP_HOST"],
    user_name: ENV["XMASC_SMTP_USERNAME"],
    password: ENV["XMASC_SMTP_PASSWORD"]
  }
end

configure :test do
  config = YAML.load_file('config/database.yml')["test"]
  ActiveRecord::Base.establish_connection(
    adapter: config["adapter"],
    database: config["database"]
  )
end
