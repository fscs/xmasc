require 'faker'
require './app/models/imp'

calendars = ["Lego Star Wars", "Lego Hot Wheels", "Lego Barbie", nil]

48.times do
  Imp.create name: Faker::Name.name, email: Faker::Internet.email,
    calendar: calendars[Random.rand(3)]
end
