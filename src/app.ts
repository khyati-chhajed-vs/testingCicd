import fastify from 'fastify';
import fastifyEnv from '@fastify/env';
import { bootstrap } from 'fastify-decorators';
import cors from '@fastify/cors';
import { initializeClients } from './clients';
import swagger from '@fastify/swagger';
import swagger_ui from '@fastify/swagger-ui';
import fs from 'fs';
import fastifyHealthcheck from 'fastify-healthcheck';
import { logger } from './common/services/logger.service';
import { secretsManager } from './common/services/secretsManager.service';
import { SECRETNAMES } from './common/constants/secret-manager.constant';

const packageJSON = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

const PORT = 8080;

// Env schema
const schema = {
  type: 'object',
  required: [],
  patternProperties: {
    'SERVER_(.*)': { type: 'string' },
    '.+': { type: 'string' },
  }, // add key properties for specific property validation
};

const app = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
    redact: ['req.headers.authorization'],
    level: 'info',
    serializers: {
      res(reply) {
        // The default
        return {
          statusCode: reply.statusCode,
        };
      },
      req(request) {
        return {
          method: request.method,
          url: request.url,
          path: request.routerPath,
          parameters: request.params, // Including the headers in the log could be in violation // of privacy laws, e.g. GDPR. using the "redact" option to // remove sensitive fields. It could also leak authentication data in // the logs.
          headers: request.headers,
        };
      },
    },
  },
});

// Env path for stages
const envPath = process.env.NODE_ENV ? `./.env.${process.env.NODE_ENV}` : './.env';
// Register handlers auto-bootstrap
app
  .register(fastifyEnv, { schema: schema, dotenv: { path: envPath } })
  .register(initializeClients)
  .register(cors, {
    origin: ['*'],
    methods: ['OPTIONS', 'GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
  })
  .register(fastifyHealthcheck)
  .register(swagger, {
    mode: 'dynamic',
    swagger: {
      info: {
        title: packageJSON.title,
        description: packageJSON.description,
        version: packageJSON.version,
        contact: {
          name: packageJSON.author,
          url: packageJSON.website,
          email: packageJSON.email,
        },
      },
      // basePath: '',
      schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },

    openapi: {
      info: {
        title: packageJSON.title,
        description: packageJSON.description,
        version: packageJSON.version,
        contact: {
          name: packageJSON.author,
          url: packageJSON.website,
          email: packageJSON.email,
        },
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  })
  .register(swagger_ui, {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'none',
      deepLinking: true,
    },
    staticCSP: false,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  })
  .register(bootstrap, {
    // Specify directory with our controllers
    directory: new URL(`controllers`, import.meta.url), // Specify mask to match only our controllers

    mask: /\.controller\./,
  });

export const configure = async () => {
  const stage = process.env.NODE_ENV as string;

  await Promise.all([secretsManager.setSecret(stage, SECRETNAMES.firebaseConfig)]);
  await app.ready();
  app.listen({ port: PORT }, (err: any) => {
    if (err) console.error(err);
    logger.info(`app->configure method->server listening on ${PORT}`);
  });
};

configure();

export default app;
