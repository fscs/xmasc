`import Ember from 'ember'`

setProperties = Ember.setProperties

ImpsController = Ember.ArrayController.extend
  actions:
    "add-imp": ->
      @createImp @get("impName"), @get("impMail"), @get("impCalendar")

  impName: null
  impMail: null
  impCalendar: null

  nameError: false
  mailError: false
  calendarError: false

  calendars: ["Lego Star Wars", "Lego City"]

  createImp: (name, mail, calendar) ->
    @resetErrors()
    if name? and mail? and calendar?
      imp = @store.createRecord "imp", name: name, email: mail, calendar: calendar
      imp.save()
    else
      setProperties @,
        nameError: unless name? then "Erforderlich"
        mailError: unless mail? then "Erforderlich"
        calendarError: unless calendar? then "Erforderlich"

  resetErrors: ->
    setProperties @,
      nameError: false
      mailError: false
      calendarError: false


`export default ImpsController`
