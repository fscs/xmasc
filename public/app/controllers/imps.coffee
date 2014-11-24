`import Ember from 'ember'`

get = Ember.get
setProperties = Ember.setProperties

filterBy = Ember.computed.filterBy
sort = Ember.computed.sort
alias = Ember.computed.alias

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

  calendars: ["Lego Star Wars", "Lego City"]

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

  sorting: ["id:desc"]
  imps: sort "filteredImps", "sorting"

`export default ImpsController`
