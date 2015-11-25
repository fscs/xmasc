define('xmasc-frontend/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('app.js should pass jshint', function (assert) {
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('xmasc-frontend/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('xmasc-frontend/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/destroy-app.js should pass jshint', function (assert) {
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('xmasc-frontend/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'xmasc-frontend/tests/helpers/start-app', 'xmasc-frontend/tests/helpers/destroy-app'], function (exports, _qunit, _xmascFrontendTestsHelpersStartApp, _xmascFrontendTestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _xmascFrontendTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        (0, _xmascFrontendTestsHelpersDestroyApp['default'])(this.application);

        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }
      }
    });
  };
});
define('xmasc-frontend/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/module-for-acceptance.js should pass jshint', function (assert) {
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('xmasc-frontend/tests/helpers/resolver', ['exports', 'ember/resolver', 'xmasc-frontend/config/environment'], function (exports, _emberResolver, _xmascFrontendConfigEnvironment) {

  var resolver = _emberResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _xmascFrontendConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _xmascFrontendConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('xmasc-frontend/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/resolver.js should pass jshint', function (assert) {
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('xmasc-frontend/tests/helpers/start-app', ['exports', 'ember', 'xmasc-frontend/app', 'xmasc-frontend/config/environment'], function (exports, _ember, _xmascFrontendApp, _xmascFrontendConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _xmascFrontendConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _xmascFrontendApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('xmasc-frontend/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/start-app.js should pass jshint', function (assert) {
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('xmasc-frontend/tests/test-helper', ['exports', 'xmasc-frontend/tests/helpers/resolver', 'ember-qunit'], function (exports, _xmascFrontendTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_xmascFrontendTestsHelpersResolver['default']);
});
define('xmasc-frontend/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('test-helper.js should pass jshint', function (assert) {
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('xmasc-frontend/tests/unit/adapters/application-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleFor)('adapter:application', 'ApplicationAdapter', {});

  (0, _emberQunit.test)('it exists', function () {
    var adapter;
    adapter = this.subject();
    return ok(adapter);
  });
});
define('xmasc-frontend/tests/unit/controllers/imps-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleFor)('controller:imps', 'ImpsController', {});

  (0, _emberQunit.test)('it exists', function () {
    var controller;
    controller = this.subject();
    return ok(controller);
  });
});
define('xmasc-frontend/tests/unit/controllers/index-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleFor)('controller:index', 'IndexController', {});

  (0, _emberQunit.test)('it exists', function () {
    var controller;
    controller = this.subject();
    return ok(controller);
  });
});
define('xmasc-frontend/tests/unit/models/imp-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleForModel)('imp', 'Imp', {
    needs: []
  });

  (0, _emberQunit.test)('it exists', function () {
    var model;
    model = this.subject();
    return ok(!!model);
  });
});
define('xmasc-frontend/tests/unit/routes/application-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleFor)('route:application', 'ApplicationRoute', {});

  (0, _emberQunit.test)('it exists', function () {
    var route;
    route = this.subject();
    return ok(route);
  });
});
define('xmasc-frontend/tests/unit/routes/imps-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleFor)('route:imps', 'ImpsRoute', {});

  (0, _emberQunit.test)('it exists', function () {
    var route;
    route = this.subject();
    return ok(route);
  });
});
define('xmasc-frontend/tests/unit/views/imps-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleFor)('view:imps', 'ImpsView');

  (0, _emberQunit.test)('it exists', function () {
    var view;
    view = this.subject();
    return ok(view);
  });
});
/* jshint ignore:start */

require('xmasc-frontend/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map