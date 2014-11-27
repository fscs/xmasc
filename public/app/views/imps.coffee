`import Ember from 'ember'`

ImpsView = Ember.View.extend
  listenForScroll: (->
    Ember.$(document).on "scroll", =>
      @set "scrollTop", Ember.$(document).scrollTop()
  ).on "didInsertElement"

  magellan: (-> @get("scrollTop") > 403).property "scrollTop"



`export default ImpsView`
