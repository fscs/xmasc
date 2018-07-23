bind "tcp://0.0.0.0:9292"
environment "production"
daemonize false

preload_app!
