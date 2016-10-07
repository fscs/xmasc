import Ember from "ember";

const {
  $,
  computed,
  on
} = Ember;

export default Ember.Component.extend({
  tagName: "form",
  elementId: "impForm",
  classNameBindings: [ "magellan" ],

  listenForScroll: on("didInsertElement", function() {
    $(document).on("scroll", () => this.set("scrollTop", Ember.$(document).scrollTop()));
  }),

  magellan: computed("scrollTop", function() {
    return this.get("scrollTop") > 352;
  })
});
