import Fastify from 'fastify'
import fastifyStatic from '@fastify/static';
import fs from 'fs'
import cors from '@fastify/cors'
import terms from './services/terms.js';
import env from './utils/env.js';
import path from 'path';

const fastify = Fastify()

const clientBuildPath = path.join(import.meta.url, '../', '../', 'client', 'build')
if (fs.existsSync(path.join(clientBuildPath, "index.html"))) {
    console.log("Serving client build ...")
    fastify.register(fastifyStatic, {
        root: clientBuildPath
    })
}

await fastify.register(cors, {
    origin: env.ALLOWED_ORIGIN,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
})

fastify.get('/api/terms', async (request, reply) => {
    reply.send(await terms.getTerms())
});

fastify.get('/api/terms/:term', async (request, reply) => {
    reply.send(await terms.getTerm(request.params.term))
});

fastify.listen({ port: 3002 });