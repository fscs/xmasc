require 'spec_helper'
require 'pry'

describe Roller do
  before do
    72.times do
      imp = build :random_imp
      imp.calendar = ["Lego Star Wars", "Lego Hotwheels", "Lego Barbie", nil].sample
      imp.save
    end
  end

  it "rolls a random distribution of tuerchen for all imps" do
    begin
      old_stdout = $stdout
      $stdout = StringIO.new("", "w")
      described_class.roll
      output = $stdout.string
    ensure
      $stdout = old_stdout
    end

    imp_calendars = Imp.all.group_by { |imp| imp.calendar }

    map = Proc.new { |imp| imp.tuerchen }

    star_wars = imp_calendars["Lego Star Wars"].map &map
    city = imp_calendars["Lego Hotwheels"].map &map
    barbie = imp_calendars["Lego Barbie"].map &map

    expect(star_wars).to match_array (1..24).to_a
    expect(city).to match_array (1..24).to_a
    expect(barbie).to match_array (1..24).to_a
    expect(imp_calendars[nil]).to be_nil

    puts
    puts output.truncate 100
  end
end
