import Ember from "ember";

const CALENDARS = ["Star Wars", "Ü-Ei", "Bierkalender"];

const {
  compare,
  computed,
  get,
  inject,
  isEmpty,
  setProperties
} = Ember;

const { filterBy, sort, alias, reads } = computed;


function restFor(impsKey) {
  const lengthKey = `${impsKey}.length`;
  return computed(lengthKey, function() {
    return 24 - this.get(lengthKey);
  });
}

function compareImpDesc(imp1, imp2) {
  return compare(+get(imp2, "id"), +get(imp1, "id"));
}

function filterImp(imp, filter) {
  return get(imp, "name").match(new RegExp(filter, "i"));
}

export default Ember.Controller.extend({
  application: inject.controller(),

  index: inject.controller(),

  actions: {
    "add-imp": function() {
      this.createImp(this.get("impName"), this.get("impMail"), this.get("impCalendar"));
    }
  },

  displayTime: reads("index.displayTime"),

  authenticated: reads("application.authenticated"),

  impName: null,
  impMail: null,
  impCalendar: null,

  nameError: alias("errors.name.firstObject"),
  emailError: alias("errors.email.firstObject"),
  calendarError: alias("errors.calendar.firstObject"),

  calendars: CALENDARS,

  starWarsName: CALENDARS[0],
  cityName: CALENDARS[1],
  barbieName: CALENDARS[2],

  createImp(name, mail, calendar) {
    const imp = this.store.createRecord("imp", {name, email: mail, calendar});

    return imp.save().then(() => this.reset(), response => {
      this.store.unloadRecord(imp);
      return this.set("errors", response.errors);
    });
  },

  reset() {
    setProperties(this, {
      impName: null,
      impMail: null,
      impCalendar: null
    });

    this.set("errors", {});
  },

  filteredImps: filterBy("model", "hasDirtyAttributes", false),

  sortedImps: sort("filteredImps", compareImpDesc),

  imps: computed("impFilter", "sortedImps", function() {
    const impFilter = this.get("impFilter"),
      imps = this.get("sortedImps");

    if (!impFilter) {
      return imps;
    } else {
      return imps.filter(imp => isEmpty(impFilter) || filterImp(imp, impFilter));
    }
  }),

  starWarsImps: filterBy("filteredImps", "calendar", CALENDARS[0]),
  restStarWars: restFor("starWarsImps"),

  cityImps: filterBy("filteredImps", "calendar", CALENDARS[1]),
  restCity: restFor("cityImps"),

  barbieImps: filterBy("filteredImps", "calendar", CALENDARS[2]),
  restBarbie: restFor("barbieImps")
});
