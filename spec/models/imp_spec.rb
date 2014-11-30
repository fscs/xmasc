require 'spec_helper'

describe Imp do
  it "should have name, email, calendar and tuerchen fields" do
    expect(subject).to respond_to :name
    expect(subject).to respond_to :email
    expect(subject).to respond_to :calendar
    expect(subject).to respond_to :tuerchen
  end
end
