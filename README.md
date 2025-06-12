# RabbitMQ HTTP Authn/Authz Backend Examples

## Overview

* Node.js and Fastify

## Node.js Example

`rabbitmq_auth_backend_fastify` is a very minimalistic [Fastify](https://fastify.dev/) application that rabbitmq-auth-backend-http can authenticate against. It's really not designed to be anything other than an example.

### Running the Example

1. Configure RabbitMQ `/etc/rabbitmq/rabbitmq.conf`

```text
...

## External Authentication Provider

### Enable cache in production
#auth_backends.1 = cache
#auth_cache.cached_backend = http
#auth_cache.cache_ttl = 86400000 # Expire in milliseconds

### Invoke auth provider everytime
auth_backends.1 = http
auth_http.http_method = post
auth_http.user_path = http://localhost:8080/auth/user
auth_http.vhost_path = http://localhost:8080/auth/vhost
auth_http.resource_path = http://localhost:8080/auth/resource
auth_http.topic_path    = http://localhost:8080/auth/topic

```

2. Enable RabbitMQ Plugins

```shell
sudo rabbitmqctl enable_feature_flag all

sudo rabbitmq-plugins enable rabbitmq_auth_backend_http

# Enable cache in production
sudo rabbitmq-plugins enable rabbitmq_auth_backend_cache

# Restart RabbitMQ service
sudo systemctl restart rabbitmq-server.service

```

3. Run this Fastify

```shell
# Clone this repo

# Install dependency
npm i

# Run this app
node fastify-auth-provider

```

4. Verify
Open RabbitMQ Management page at `http://localhost:15672/`.
You should be able to login by typing any username and password

### Improvements

* [] Support YAML configuration
* [] Read credentials from a file
* [] Read credentials from Redis
* [] Read credentials from DB

## References

* [rabbitmq_auth_backend_http](https://github.com/rabbitmq/rabbitmq-server/tree/main/deps/rabbitmq_auth_backend_http)

* [rabbitmq_auth_backend_http examples](https://github.com/rabbitmq/rabbitmq-server/tree/main/deps/rabbitmq_auth_backend_http/examples)

* [RabbitMQ Management Plugin Permissions](https://www.rabbitmq.com/docs/management#permissions)
