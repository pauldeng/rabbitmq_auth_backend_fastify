const Fastify = require('fastify');

const fastify = Fastify({
  logger: true, // Enable Fastify logger for better observability
  keepAliveTimeout: 65 * 1000, // Increase keep-alive timeout for high concurrency
  connectionTimeout: 10 * 1000, // Increase connection timeout
});

// Register formbody plugin to support application/x-www-form-urlencoded
fastify.register(require('@fastify/formbody'));

// JSON schema for user auth
const userAuthSchema = {
  body: {
    type: 'object',
    required: ['username', 'password'],
    properties: {
      username: { type: 'string', minLength: 1 },
      vhost: { type: 'string', minLength: 1 },
      password: { type: 'string', minLength: 1 },
      client_id: { type: 'string', minLength: 1 },
    },
  },
};

// JSON schema for vhost auth
const vhostAuthSchema = {
  body: {
    type: 'object',
    required: ['username', 'vhost', 'ip'],
    properties: {
      username: { type: 'string', minLength: 1 },
      vhost: { type: 'string', minLength: 1 },
      ip: { type: 'string', minLength: 1 },
    },
  },
};

// JSON schema for resource auth
const resourceAuthSchema = {
  body: {
    type: 'object',
    required: ['username', 'vhost', 'resource', 'permission'],
    properties: {
      username: { type: 'string', minLength: 1 },
      vhost: { type: 'string', minLength: 1 },
      resource: { type: 'string', minLength: 1 },
      permission: { type: 'string', minLength: 1 },
    },
  },
};

// JSON schema for topic auth
const topicAuthSchema = {
  body: {
    type: 'object',
    required: ['username', 'vhost', 'resource', 'name', 'permission', 'routing_key'],
    properties: {
      username: { type: 'string', minLength: 1 },
      vhost: { type: 'string', minLength: 1 },
      resource: { type: 'string', minLength: 1 },
      name: { type: 'string', minLength: 1 },
      permission: { type: 'string', minLength: 1 },
      routing_key: { type: 'string', minLength: 1 },
    },
  },
};

// Called by RabbitMQ to verify user
fastify.post('/auth/user', { schema: userAuthSchema }, async (req, reply) => {
  return reply.send('allow administrator management');
});

// Called to check vhost access
fastify.post('/auth/vhost', { schema: vhostAuthSchema }, async (req, reply) => {
  return reply.send('allow');
});

// Called to check permissions
fastify.post('/auth/resource', { schema: resourceAuthSchema }, async (req, reply) => {
  return reply.send('allow');
});

// Called to check topic permissions
fastify.post('/auth/topic', { schema: topicAuthSchema }, async (req, reply) => {
    console.log()
  return reply.send('allow');
});

fastify.listen({ port: 8080, host: '0.0.0.0' });