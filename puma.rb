bind "tcp://0.0.0.0:9292"
environment "development"
daemonize true

stdout_redirect 'log/production.log', 'log/production.log', true

preload_app!
