`import Ember from 'ember'`

ApplicationRoute = Ember.Route.extend
  actions:
    authenticate: ->
      success = => @controller.set "authenticated", true
      failure = => @controller.set "authenticated", false
      Em.$.getJSON("/authenticate").then success, failure

`export default ApplicationRoute`
