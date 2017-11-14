bind "tcp://0.0.0.0:9292"
environment "production"
daemonize false

stdout_redirect 'log/production.log', 'log/production.log', true

preload_app!
