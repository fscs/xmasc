`import Ember from 'ember'`

ImpsRoute = Ember.Route.extend
  model: -> @store.find "imp"

`export default ImpsRoute`
