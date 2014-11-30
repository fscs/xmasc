require './app'
require 'sinatra/activerecord/rake'

task default: :build

desc "Build frontend and automatically watch for changes in the source files"
task :build do
  Dir.chdir "public" do
    sh "node_modules/ember-cli/bin/ember build --watch"
  end
end

STARWARS = "Lego Star Wars"
CITY = "Lego City"
TUERCHEN = 24

calendars = {
  "#{STARWARS}" => (1..TUERCHEN).to_a,
  "#{CITY}" => (1..TUERCHEN).to_a
}

task :roll do
  imp_calendars = Imp.all.group_by { |imp| imp.calendar }

  # roll_fixed_calendars
  for calendar in [STARWARS, CITY]
    imps = imp_calendars[calendar]

    for imp in imps
      make_tuerchen_for imp, calendars[calendar]
    end

  end
  # roll_rest

  if imp_calendars[nil]
    for imp in imp_calendars[nil]
      calendar = get_random_calendar_from(calendars)
      imp.calendar = calendar
      imp.save
      make_tuerchen_for imp, calendars[calendar]
    end
  end
end

def make_tuerchen_for imp, calendar
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

def draw_tuerchen_from calendar
  tuerchen = calendar.sample
  calendar.delete tuerchen
  tuerchen
end

def get_random_calendar_from calendars
  while c = calendars.keys.sample and calendars[c].length == 0
  end
  c
end
