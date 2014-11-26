`import Ember from 'ember'`

ImpsView = Ember.View.extend
  didInsertElement: -> @$().foundation "magellan"

`export default ImpsView`
