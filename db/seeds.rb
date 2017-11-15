require 'faker'
require './app/models/imp'

calendars = ["Star Wars", "Ü--Ei", "Bierkalender", nil]

72.times do
  Imp.create name: Faker::Name.name, email: Faker::Internet.email,
    calendar: calendars[Random.rand(3)]
end
