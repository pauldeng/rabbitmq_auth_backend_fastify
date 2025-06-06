RabbitMQ enable plugins

```shell
sudo rabbitmq-plugins enable rabbitmq_auth_backend_http

# Enable cache in production
sudo rabbitmq-plugins enable rabbitmq_auth_backend_cache

```

RabbitMQ conf

```
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