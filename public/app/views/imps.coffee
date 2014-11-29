`import Ember from 'ember'`

$ = Ember.$

ImpsView = Ember.View.extend
  listenForScroll: (->
    scroll = => @set "scrollTop", Ember.$(document).scrollTop()
    $(document).on "scroll", scroll
  ).on "didInsertElement"

  magellan: (-> @get("scrollTop") > 352).property "scrollTop"


`export default ImpsView`
