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
  db = URI.parse(ENV['DATABASE_URL'] || 'postgres://localhost/mydb')

  ActiveRecord::Base.establish_connection(
    :adapter => db.scheme == 'postgres' ? 'postgresql' : db.scheme,
    :host     => db.host,
    :username => db.user,
    :password => db.password,
    :database => db.path[1..-1],
    :encoding => 'utf8'
  )

  ActionMailer::Base.smtp_settings = {
    :port           => '25',
    :address        => ENV['POSTMARK_SMTP_SERVER'],
    :user_name      => ENV['POSTMARK_API_KEY'],
    :password       => ENV['POSTMARK_API_KEY'],
    :domain         => 'xmasc.herokuapp.com',
    :authentication => :plain,
    :enable_starttls_auto => false
  }
  ActionMailer::Base.delivery_method = :smtp
end

configure :test do
  config = YAML.load_file('config/database.yml')["test"]
  ActiveRecord::Base.establish_connection(
    adapter: config["adapter"],
    database: config["database"]
  )
end
