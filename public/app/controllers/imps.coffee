`import Ember from 'ember'`

CALENDARS = ["Lego Star Wars", "Lego City"]

get = Ember.get
setProperties = Ember.setProperties

computed = Ember.computed
filterBy = computed.filterBy
sort = computed.sort
alias = computed.alias

compare = Ember.compare

restFor = (impsKey) ->
  lengthKey = "#{impsKey}.length"
  computed lengthKey, -> 24 - @get lengthKey

compareImpDesc = (imp1, imp2) -> compare +get(imp2, "id"), +get(imp1, "id")

ImpsController = Ember.ArrayController.extend
  actions:
    "add-imp": ->
      @createImp @get("impName"), @get("impMail"), @get("impCalendar")

  impName: null
  impMail: null
  impCalendar: null

  nameError: alias "errors.name.firstObject"
  emailError: alias "errors.email.firstObject"
  calendarError: alias "errors.calendar.firstObject"

  calendars: CALENDARS

  createImp: (name, mail, calendar) ->
    imp = @store.createRecord "imp", name: name, email: mail, calendar: calendar
    imp.save().then (=> @reset()), (response) =>
      @store.unloadRecord imp
      @set "errors", response.errors

  reset: ->
    setProperties @,
      impName: null
      impMail: null
      impCalendar: null

    @set "errors", {}

  filteredImps: filterBy "content", "isDirty", false

  imps: sort "filteredImps", compareImpDesc

  starWarsImps: filterBy "content", "calendar", CALENDARS[0]
  restStarWars: restFor "starWarsImps"

  cityImps: filterBy "content", "calendar", CALENDARS[1]
  restCity: restFor "cityImps"

`export default ImpsController`
