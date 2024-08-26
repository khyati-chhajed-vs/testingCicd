import { FastifyPluginAsync } from 'fastify';

import { auth } from 'firebase-admin';
declare module 'fastify' {
  export interface FastifyInstance<> {
    config: FastifyPluginAsync;
  }

  interface FastifyRequest {
    decodedToken?: auth.DecodedIdToken;
    data?: any;
  }
}
