STARWARS = "Lego Star Wars"
CITY = "Lego Hotwheels"
BARBIE = "Lego Barbie"
CALENDARS = [STARWARS, CITY, BARBIE]
TUERCHEN = 24

CALENDAR_TUERCHEN = {
  "#{STARWARS}" => (1..TUERCHEN).to_a,
  "#{CITY}" => (1..TUERCHEN).to_a,
  "#{BARBIE}" => (1..TUERCHEN).to_a
}


class Roller

  def self.roll
    Imp.all.update_all tuerchen: nil
    imp_calendars = Imp.all.group_by { |imp| imp.calendar }

    # roll_fixed_calendars
    for calendar in CALENDARS
      imps = imp_calendars[calendar]

      unless imps.nil?
        for imp in imps
          make_tuerchen_for imp, CALENDAR_TUERCHEN[calendar]
        end
      end

    end
    # roll_rest

    if imp_calendars[nil]
      for imp in imp_calendars[nil]
        calendar = get_random_calendar_from(CALENDAR_TUERCHEN)
        imp.calendar = calendar
        imp.save
        make_tuerchen_for imp, CALENDAR_TUERCHEN[calendar]
      end
    end
  end

  private

  def self.make_tuerchen_for imp, calendar
    tuerchen = draw_tuerchen_from calendar
    imp.tuerchen = tuerchen
    if imp.save
      puts "#{imp.name} will get tuerchen #{imp.tuerchen} in #{imp.calendar}"
    else
      puts "Error for #{imp.name} with tuerchen #{imp.tuerchen} in #{imp.calendar}:"
      for field in imp.errors.keys
        puts "#{field}: #{imp.errors[field].join ", "}"
      end
    end
  end

  def self.draw_tuerchen_from calendar
    tuerchen = calendar.sample
    calendar.delete tuerchen
    tuerchen
  end

  def self.get_random_calendar_from calendars
    while c = calendars.keys.sample and calendars[c].length == 0
    end
    c
  end
end
