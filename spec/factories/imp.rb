require 'faker'

FactoryGirl.define do
  sequence(:email) { |n| "email#{n}@example.com" }
  factory :imp do
    name { Faker::Name.name }
    email

    trait(:starwars) { calendar "Lego Star Wars" }
    trait(:city) { calendar "Lego City" }
    trait(:nil) { calendar nil }
    trait(:random) { calendar { ["Lego Star Wars", "Lego City", nil].sample } }

    factory :starwars_imp, traits: [:starwars]
    factory :city_imp, traits: [:city]
    factory :nil_imp, traits: [:nil]
    factory :random_imp, traits: [:random]
  end
end
