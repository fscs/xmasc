require 'faker'

FactoryGirl.define do
  sequence(:email) { |n| "email#{n}@example.com" }
  factory :imp do
    name { Faker::Name.name }
    email

    trait(:starwars) { calendar "Lego Star Wars" }
    trait(:city) { calendar "Lego City" }
    trait(:random) { calendar nil }

    factory :starwars_imp, traits: [:starwars]
    factory :city_imp, traits: [:city]
    factory :random_imp, traits: [:random]
  end
end
