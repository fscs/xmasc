import DS from "ember-data";

const { attr } = DS;

export default DS.Model.extend({
  name: attr("string"),
  email: attr("string"),
  calendar: attr("string"),
  tuerchen: attr("number")
});
