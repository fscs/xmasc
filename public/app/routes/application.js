import Ember from "ember";

export default Ember.Route.extend({
  actions: {
    authenticate() {
      const success = () => this.controller.set("authenticated", true);
      const failure = () => this.controller.set("authenticated", false);
      return Ember.$.getJSON("/authenticate").then(success, failure);
    }
  }
});
