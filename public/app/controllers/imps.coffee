`import Ember from 'ember'`

CALENDARS = ["Lego Star Wars", "Lego City"]

get = Ember.get
setProperties = Ember.setProperties

computed = Ember.computed
filterBy = computed.filterBy
sort = computed.sort
alias = computed.alias
reads = computed.reads

compare = Ember.compare
isEmpty = Ember.isEmpty

restFor = (impsKey) ->
  lengthKey = "#{impsKey}.length"
  computed lengthKey, -> 24 - @get lengthKey

compareImpDesc = (imp1, imp2) -> compare +get(imp2, "id"), +get(imp1, "id")

filterImp = (imp, filter) -> get(imp, "name").match new RegExp filter, "i"

ImpsController = Ember.ArrayController.extend
  needs: ["index", "application"]

  actions:
    "add-imp": ->
      @createImp @get("impName"), @get("impMail"), @get("impCalendar")

  displayTime: reads "controllers.index.displayTime"

  authenticated: reads "controllers.application.authenticated"

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

  sortedImps: sort "filteredImps", compareImpDesc

  imps: (->
    impFilter = @get "impFilter"
    imps = @get "sortedImps"
    unless impFilter?
      imps
    else
      imps.filter (imp) -> isEmpty(impFilter) or filterImp imp, impFilter
  ).property "impFilter", "sortedImps"

  starWarsImps: filterBy "filteredImps", "calendar", CALENDARS[0]
  restStarWars: restFor "starWarsImps"

  cityImps: filterBy "filteredImps", "calendar", CALENDARS[1]
  restCity: restFor "cityImps"

`export default ImpsController`
