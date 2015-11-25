"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define("xmasc-frontend/adapters/application", ["exports", "ember-data"], function (exports, _emberData) {
  var ApplicationAdapter;

  ApplicationAdapter = _emberData["default"].ActiveModelAdapter.extend({
    host: "/api"
  });

  exports["default"] = ApplicationAdapter;
});
define('xmasc-frontend/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'xmasc-frontend/config/environment'], function (exports, _ember, _emberResolver, _emberLoadInitializers, _xmascFrontendConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _xmascFrontendConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _xmascFrontendConfigEnvironment['default'].podModulePrefix,
    Resolver: _emberResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _xmascFrontendConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('xmasc-frontend/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'xmasc-frontend/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _xmascFrontendConfigEnvironment) {

  var name = _xmascFrontendConfigEnvironment['default'].APP.name;
  var version = _xmascFrontendConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('xmasc-frontend/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define("xmasc-frontend/controllers/imps", ["exports", "ember"], function (exports, _ember) {
  var CALENDARS, ImpsController, alias, compare, compareImpDesc, computed, filterBy, filterImp, get, isEmpty, reads, restFor, setProperties, sort;

  CALENDARS = ["Lego Star Wars", "Lego City"];

  get = _ember["default"].get;

  setProperties = _ember["default"].setProperties;

  computed = _ember["default"].computed;

  filterBy = computed.filterBy;

  sort = computed.sort;

  alias = computed.alias;

  reads = computed.reads;

  compare = _ember["default"].compare;

  isEmpty = _ember["default"].isEmpty;

  restFor = function (impsKey) {
    var lengthKey;
    lengthKey = impsKey + ".length";
    return computed(lengthKey, function () {
      return 24 - this.get(lengthKey);
    });
  };

  compareImpDesc = function (imp1, imp2) {
    return compare(+get(imp2, "id"), +get(imp1, "id"));
  };

  filterImp = function (imp, filter) {
    return get(imp, "name").match(new RegExp(filter, "i"));
  };

  ImpsController = _ember["default"].ArrayController.extend({
    needs: ["index", "application"],
    actions: {
      "add-imp": function addImp() {
        return this.createImp(this.get("impName"), this.get("impMail"), this.get("impCalendar"));
      }
    },
    displayTime: reads("controllers.index.displayTime"),
    authenticated: reads("controllers.application.authenticated"),
    impName: null,
    impMail: null,
    impCalendar: null,
    nameError: alias("errors.name.firstObject"),
    emailError: alias("errors.email.firstObject"),
    calendarError: alias("errors.calendar.firstObject"),
    calendars: CALENDARS,
    createImp: function createImp(name, mail, calendar) {
      var imp;
      imp = this.store.createRecord("imp", {
        name: name,
        email: mail,
        calendar: calendar
      });
      return imp.save().then((function (_this) {
        return function () {
          return _this.reset();
        };
      })(this), (function (_this) {
        return function (response) {
          _this.store.unloadRecord(imp);
          return _this.set("errors", response.errors);
        };
      })(this));
    },
    reset: function reset() {
      setProperties(this, {
        impName: null,
        impMail: null,
        impCalendar: null
      });
      return this.set("errors", {});
    },
    filteredImps: filterBy("content", "isDirty", false),
    sortedImps: sort("filteredImps", compareImpDesc),
    imps: (function () {
      var impFilter, imps;
      impFilter = this.get("impFilter");
      imps = this.get("sortedImps");
      if (impFilter == null) {
        return imps;
      } else {
        return imps.filter(function (imp) {
          return isEmpty(impFilter) || filterImp(imp, impFilter);
        });
      }
    }).property("impFilter", "sortedImps"),
    starWarsImps: filterBy("filteredImps", "calendar", CALENDARS[0]),
    restStarWars: restFor("starWarsImps"),
    cityImps: filterBy("filteredImps", "calendar", CALENDARS[1]),
    restCity: restFor("cityImps")
  });

  exports["default"] = ImpsController;
});
define("xmasc-frontend/controllers/index", ["exports", "ember"], function (exports, _ember) {
  var IndexController, dayMilis, floor, getRestTime, getTimeFrom, hourMilis, minuteMilis, secondMilis;

  getRestTime = function () {
    return new Date(2014, 11, 1) - new Date();
  };

  floor = Math.floor;

  dayMilis = 864e5;

  hourMilis = 36e5;

  minuteMilis = 6e4;

  secondMilis = 1e3;

  getTimeFrom = function (time) {
    var days, hours, minutes, seconds;
    days = floor(time / dayMilis);
    hours = floor(time % dayMilis / hourMilis);
    minutes = floor(time % hourMilis / minuteMilis);
    seconds = floor(time % minuteMilis / secondMilis);
    return "Noch " + days + " Tage " + hours + " Stunden " + minutes + " Minuten " + seconds + " Sekunden";
  };

  IndexController = _ember["default"].ObjectController.extend({
    time: getRestTime(),
    displayTime: (function () {
      var time;
      time = this.get("time");
      if (time > 0) {
        return getTimeFrom(time);
      } else {
        return "Frohe Weihnachten! · Merry Christmas! <br> Chanukah Sameach! · Heri Za Kwanzaa!";
      }
    }).property("time"),
    startTimer: (function () {
      return setInterval((function (_this) {
        return function () {
          return _this.set("time", getRestTime());
        };
      })(this), 1000);
    }).on("init")
  });

  exports["default"] = IndexController;
});
define('xmasc-frontend/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('xmasc-frontend/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'xmasc-frontend/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _xmascFrontendConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_xmascFrontendConfigEnvironment['default'].APP.name, _xmascFrontendConfigEnvironment['default'].APP.version)
  };
});
define('xmasc-frontend/initializers/export-application-global', ['exports', 'ember', 'xmasc-frontend/config/environment'], function (exports, _ember, _xmascFrontendConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_xmascFrontendConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _xmascFrontendConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_xmascFrontendConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define("xmasc-frontend/models/imp", ["exports", "ember-data"], function (exports, _emberData) {
  var Imp, attr;

  attr = _emberData["default"].attr;

  Imp = _emberData["default"].Model.extend({
    name: attr("string"),
    email: attr("string"),
    calendar: attr("string"),
    tuerchen: attr("number")
  });

  exports["default"] = Imp;
});
define('xmasc-frontend/router', ['exports', 'ember', 'xmasc-frontend/config/environment'], function (exports, _ember, _xmascFrontendConfigEnvironment) {
  var Router;

  Router = _ember['default'].Router.extend({
    location: _xmascFrontendConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    return this.resource("imps");
  });

  exports['default'] = Router;
});
define("xmasc-frontend/routes/application", ["exports", "ember"], function (exports, _ember) {
  var ApplicationRoute;

  ApplicationRoute = _ember["default"].Route.extend({
    actions: {
      authenticate: function authenticate() {
        var failure, success;
        success = (function (_this) {
          return function () {
            return _this.controller.set("authenticated", true);
          };
        })(this);
        failure = (function (_this) {
          return function () {
            return _this.controller.set("authenticated", false);
          };
        })(this);
        return Em.$.getJSON("/authenticate").then(success, failure);
      }
    }
  });

  exports["default"] = ApplicationRoute;
});
define("xmasc-frontend/routes/imps", ["exports", "ember"], function (exports, _ember) {
  var ImpsRoute;

  ImpsRoute = _ember["default"].Route.extend({
    model: function model() {
      return this.store.find("imp");
    }
  });

  exports["default"] = ImpsRoute;
});
define("xmasc-frontend/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.10",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 14,
            "column": 0
          }
        },
        "moduleName": "xmasc-frontend/templates/application.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("a");
        dom.setAttribute(el1, "id", "authLink");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "wrapper row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "small-11 columns");
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("header");
        dom.setAttribute(el3, "id", "xmascHeader");
        dom.setAttribute(el3, "class", "row");
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("img");
        dom.setAttribute(el4, "src", "img/header.jpg");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "wrapper row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "small-11 columns text-center");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(2);
        morphs[0] = dom.createElementMorph(element0);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [4, 1]), 1, 1);
        return morphs;
      },
      statements: [["element", "action", ["authenticate"], [], ["loc", [null, [1, 3], [1, 28]]]], ["content", "outlet", ["loc", [null, [11, 4], [11, 14]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("xmasc-frontend/templates/countdown", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.10",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "xmasc-frontend/templates/countdown.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "countdowntimer");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createUnsafeMorphAt(dom.childAt(fragment, [0]), 0, 0);
        return morphs;
      },
      statements: [["content", "displayTime", ["loc", [null, [1, 25], [1, 42]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("xmasc-frontend/templates/imp", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.10",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 4
            },
            "end": {
              "line": 10,
              "column": 4
            }
          },
          "moduleName": "xmasc-frontend/templates/imp.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "tuerchen");
          var el2 = dom.createTextNode("\n        Türchen\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1]), 0, 0);
          return morphs;
        },
        statements: [["content", "tuerchen", ["loc", [null, [8, 13], [8, 25]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.10",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 13,
            "column": 0
          }
        },
        "moduleName": "xmasc-frontend/templates/imp.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("li");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("small");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [3]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(element0, 1, 1);
        morphs[1] = dom.createMorphAt(element1, 1, 1);
        morphs[2] = dom.createMorphAt(element1, 3, 3);
        return morphs;
      },
      statements: [["content", "name", ["loc", [null, [2, 2], [2, 10]]]], ["content", "calendar", ["loc", [null, [4, 4], [4, 16]]]], ["block", "if", [["get", "tuerchen", ["loc", [null, [5, 10], [5, 18]]]]], [], 0, null, ["loc", [null, [5, 4], [10, 11]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("xmasc-frontend/templates/imps", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.10",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 4
            },
            "end": {
              "line": 5,
              "column": 4
            }
          },
          "moduleName": "xmasc-frontend/templates/imps.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "partial", ["countdown"], [], ["loc", [null, [4, 6], [4, 29]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.10",
            "loc": {
              "source": null,
              "start": {
                "line": 9,
                "column": 12
              },
              "end": {
                "line": 11,
                "column": 12
              }
            },
            "moduleName": "xmasc-frontend/templates/imps.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("              ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("small");
            dom.setAttribute(el1, "class", "error");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
            return morphs;
          },
          statements: [["content", "calendarError", ["loc", [null, [10, 35], [10, 52]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.10",
            "loc": {
              "source": null,
              "start": {
                "line": 15,
                "column": 12
              },
              "end": {
                "line": 17,
                "column": 12
              }
            },
            "moduleName": "xmasc-frontend/templates/imps.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("              ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("small");
            dom.setAttribute(el1, "class", "error");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
            return morphs;
          },
          statements: [["content", "nameError", ["loc", [null, [16, 35], [16, 48]]]]],
          locals: [],
          templates: []
        };
      })();
      var child2 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.10",
            "loc": {
              "source": null,
              "start": {
                "line": 21,
                "column": 12
              },
              "end": {
                "line": 23,
                "column": 12
              }
            },
            "moduleName": "xmasc-frontend/templates/imps.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("              ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("small");
            dom.setAttribute(el1, "class", "error");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
            return morphs;
          },
          statements: [["content", "emailError", ["loc", [null, [22, 35], [22, 49]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.10",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 4
            },
            "end": {
              "line": 29,
              "column": 4
            }
          },
          "moduleName": "xmasc-frontend/templates/imps.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "row collapse prefix-round postfix-round");
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "small-3 columns");
          var el3 = dom.createTextNode("\n            ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("          ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "small-3 columns");
          var el3 = dom.createTextNode("\n            ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("          ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "small-3 columns");
          var el3 = dom.createTextNode("\n            ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("          ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "small-2 columns");
          var el3 = dom.createTextNode("\n            ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("button");
          dom.setAttribute(el3, "class", "button postfix");
          var el4 = dom.createTextNode("Pekmez");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n          ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var element2 = dom.childAt(element1, [1]);
          var element3 = dom.childAt(element1, [3]);
          var element4 = dom.childAt(element1, [5]);
          var element5 = dom.childAt(element1, [7, 1]);
          var morphs = new Array(7);
          morphs[0] = dom.createMorphAt(element2, 1, 1);
          morphs[1] = dom.createMorphAt(element2, 3, 3);
          morphs[2] = dom.createMorphAt(element3, 1, 1);
          morphs[3] = dom.createMorphAt(element3, 3, 3);
          morphs[4] = dom.createMorphAt(element4, 1, 1);
          morphs[5] = dom.createMorphAt(element4, 3, 3);
          morphs[6] = dom.createElementMorph(element5);
          return morphs;
        },
        statements: [["inline", "view", ["select"], ["name", "calendar", "prompt", "Kalender", "value", ["subexpr", "@mut", [["get", "impCalendar", ["loc", [null, [8, 68], [8, 79]]]]], [], []], "content", ["subexpr", "@mut", [["get", "calendars", ["loc", [null, [8, 88], [8, 97]]]]], [], []], "class", ["subexpr", "concat", ["prefix", " ", ["subexpr", "if", [["get", "calendarError", []], "error"], [], []], " "], [], []]], ["loc", [null, [8, 12], [8, 147]]]], ["block", "if", [["get", "calendarError", ["loc", [null, [9, 18], [9, 31]]]]], [], 0, null, ["loc", [null, [9, 12], [11, 19]]]], ["inline", "input", [], ["name", "name", "value", ["subexpr", "@mut", [["get", "impName", ["loc", [null, [14, 38], [14, 45]]]]], [], []], "placeholder", "Name", "class", ["subexpr", "@mut", [["get", "nameError:error", ["loc", [null, [14, 71], [14, 86]]]]], [], []]], ["loc", [null, [14, 12], [14, 88]]]], ["block", "if", [["get", "nameError", ["loc", [null, [15, 18], [15, 27]]]]], [], 1, null, ["loc", [null, [15, 12], [17, 19]]]], ["inline", "input", [], ["name", "email", "value", ["subexpr", "@mut", [["get", "impMail", ["loc", [null, [20, 39], [20, 46]]]]], [], []], "placeholder", "E-Mail", "class", ["subexpr", "@mut", [["get", "emailError:error", ["loc", [null, [20, 74], [20, 90]]]]], [], []]], ["loc", [null, [20, 12], [20, 92]]]], ["block", "if", [["get", "emailError", ["loc", [null, [21, 18], [21, 28]]]]], [], 2, null, ["loc", [null, [21, 12], [23, 19]]]], ["element", "action", ["add-imp"], [], ["loc", [null, [26, 20], [26, 40]]]]],
        locals: [],
        templates: [child0, child1, child2]
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.10",
          "loc": {
            "source": null,
            "start": {
              "line": 33,
              "column": 0
            },
            "end": {
              "line": 40,
              "column": 0
            }
          },
          "moduleName": "xmasc-frontend/templates/imps.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "row");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "small-11 columns text-center");
          var el3 = dom.createTextNode("\n      Türchen vergeben: ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("em");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("/48");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("br");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      Lego Star Wars: ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("em");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode(" Türchen übrig");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode(" · Lego City: ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("em");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode(" Türchen übrig");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1, 1]);
          var morphs = new Array(3);
          morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]), 0, 0);
          morphs[1] = dom.createMorphAt(dom.childAt(element0, [4]), 0, 0);
          morphs[2] = dom.createMorphAt(dom.childAt(element0, [6]), 0, 0);
          return morphs;
        },
        statements: [["content", "imps.length", ["loc", [null, [36, 28], [36, 43]]]], ["content", "restStarWars", ["loc", [null, [37, 26], [37, 42]]]], ["content", "restCity", ["loc", [null, [37, 86], [37, 98]]]]],
        locals: [],
        templates: []
      };
    })();
    var child3 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.10",
          "loc": {
            "source": null,
            "start": {
              "line": 46,
              "column": 6
            },
            "end": {
              "line": 48,
              "column": 6
            }
          },
          "moduleName": "xmasc-frontend/templates/imps.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "partial", ["imp"], [], ["loc", [null, [47, 8], [47, 25]]]]],
        locals: [],
        templates: []
      };
    })();
    var child4 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.10",
            "loc": {
              "source": null,
              "start": {
                "line": 49,
                "column": 8
              },
              "end": {
                "line": 51,
                "column": 8
              }
            },
            "moduleName": "xmasc-frontend/templates/imps.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("li");
            dom.setAttribute(el1, "class", "empty");
            var el2 = dom.createElement("em");
            var el3 = dom.createTextNode("Noch keine Teilnehmer vorhanden. Sei der Erste!");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.10",
          "loc": {
            "source": null,
            "start": {
              "line": 48,
              "column": 6
            },
            "end": {
              "line": 52,
              "column": 6
            }
          },
          "moduleName": "xmasc-frontend/templates/imps.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "authenticated", ["loc", [null, [49, 14], [49, 27]]]]], [], 0, null, ["loc", [null, [49, 8], [51, 15]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.10",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 56,
            "column": 0
          }
        },
        "moduleName": "xmasc-frontend/templates/imps.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "magellan-wrapper");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("form");
        dom.setAttribute(el2, "id", "impForm");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("section");
        dom.setAttribute(el1, "class", "row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "small-11 columns");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "class", "imps");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element6 = dom.childAt(fragment, [0, 1]);
        var element7 = dom.childAt(fragment, [4, 1]);
        var morphs = new Array(5);
        morphs[0] = dom.createAttrMorph(element6, 'class');
        morphs[1] = dom.createMorphAt(element6, 1, 1);
        morphs[2] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[3] = dom.createMorphAt(element7, 1, 1);
        morphs[4] = dom.createMorphAt(dom.childAt(element7, [3]), 1, 1);
        return morphs;
      },
      statements: [["attribute", "class", ["concat", [["subexpr", "-bind-attr-class", [["get", "view.magellan", []], "magellan"], [], []]]]], ["block", "unless", [["get", "authenticated", ["loc", [null, [3, 14], [3, 27]]]]], [], 0, 1, ["loc", [null, [3, 4], [29, 15]]]], ["block", "if", [["get", "authenticated", ["loc", [null, [33, 6], [33, 19]]]]], [], 2, null, ["loc", [null, [33, 0], [40, 7]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "impFilter", ["loc", [null, [44, 18], [44, 27]]]]], [], []], "placeholder", "Suche Wichtel"], ["loc", [null, [44, 4], [44, 57]]]], ["block", "each", [["get", "imps", ["loc", [null, [46, 14], [46, 18]]]]], [], 3, 4, ["loc", [null, [46, 6], [52, 15]]]]],
      locals: [],
      templates: [child0, child1, child2, child3, child4]
    };
  })());
});
define("xmasc-frontend/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.10",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 0
          }
        },
        "moduleName": "xmasc-frontend/templates/index.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "text-center");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2]), 1, 1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "partial", ["countdown"], [], ["loc", [null, [1, 0], [1, 23]]]], ["inline", "link-to", ["Hier gehts zur Wichtelliste", "imps"], [], ["loc", [null, [3, 2], [3, 50]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("xmasc-frontend/views/imps", ["exports", "ember"], function (exports, _ember) {
  var $, ImpsView;

  $ = _ember["default"].$;

  ImpsView = _ember["default"].View.extend({
    listenForScroll: (function () {
      var scroll;
      scroll = (function (_this) {
        return function () {
          return _this.set("scrollTop", _ember["default"].$(document).scrollTop());
        };
      })(this);
      return $(document).on("scroll", scroll);
    }).on("didInsertElement"),
    magellan: (function () {
      return this.get("scrollTop") > 352;
    }).property("scrollTop")
  });

  exports["default"] = ImpsView;
});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('xmasc-frontend/config/environment', ['ember'], function(Ember) {
  var prefix = 'xmasc-frontend';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (!runningTests) {
  require("xmasc-frontend/app")["default"].create({"LOG_ACTIVE_GENERATION":true,"LOG_VIEW_LOOKUPS":true,"name":"xmasc-frontend","version":"0.0.0+62e5cf5a"});
}

/* jshint ignore:end */
//# sourceMappingURL=xmasc-frontend.map