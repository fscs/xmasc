`import DS from 'ember-data'`

attr = DS.attr

Imp = DS.Model.extend
  name: attr "string"
  email: attr "string"
  calendar: attr "string"
  tuerchen: attr "number"

`export default Imp`
