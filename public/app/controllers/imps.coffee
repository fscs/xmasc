`import Ember from 'ember'`

get = Ember.get
setProperties = Ember.setProperties

ImpsController = Ember.ArrayController.extend
  actions:
    "add-imp": ->
      @createImp @get("impName"), @get("impMail"), @get("impCalendar")

  impName: null
  impMail: null
  impCalendar: null

  nameError: false
  emailError: false
  calendarError: false

  calendars: ["Lego Star Wars", "Lego City"]

  createImp: (name, mail, calendar) ->
    @resetErrors()
    imp = @store.createRecord "imp", name: name, email: mail, calendar: calendar
    imp.save().then (=> @resetForm())

  resetErrors: ->
    setProperties @,
      nameError: false
      emailError: false
      calendarError: false

  resetForm: ->
    setProperties @,
      impName: null
      impMail: null
      impCalendar: null


`export default ImpsController`
