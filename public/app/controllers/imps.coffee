`import Ember from 'ember'`

ImpsController = Ember.ArrayController.extend
  actions:
    "add-imp": -> @createImp @get("impName"), @get("impMail")

  impName: null
  impMail: null

  createImp: (name, mail) ->
    imp = @store.createRecord "imp", name: name, email: mail
    imp.save()

`export default ImpsController`
