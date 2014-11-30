require 'spec_helper'

describe Imp do
  it "has name, email, calendar and tuerchen fields" do
    expect(subject).to respond_to :name
    expect(subject).to respond_to :email
    expect(subject).to respond_to :calendar
    expect(subject).to respond_to :tuerchen
  end

  it "does not accept more than 24 tuerchen for one calendar" do
    24.times { create :starwars_imp }
    expect { create :starwars_imp }.to raise_error ActiveRecord::RecordInvalid
  end

  it "does not accept more than 48 tuerchen in total" do
    48.times { create :random_imp }
    expect { create :random_imp }.to raise_error ActiveRecord::RecordInvalid
  end
end
