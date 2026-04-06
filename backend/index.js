import Fastify from 'fastify'
import fastifyStatic from '@fastify/static';
import fs from 'fs'
import cors from '@fastify/cors'
import terms from './services/terms.js';
import env from './utils/env.js';
import path from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify()

const clientBuildPath = path.join(__dirname, '../', 'client', 'build')
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

const widgetDistPath = path.join(__dirname, '../', 'widget', 'dist')
if (fs.existsSync(path.join(widgetDistPath, "movement-glossary.js"))) {
    console.log("Serving widget dist ...")
    fastify.register(fastifyStatic, {
        root: widgetDistPath,
        prefix: "/widget/",
        decorateReply: false
    })
}

fastify.get('/api/terms', async (request, reply) => {
    const docs = await terms.getTerms();
    const objs = docs.map(d => (typeof d.toObject === 'function' ? d.toObject() : d));
    reply.send(objs);
});

fastify.get('/api/terms/:term', async (request, reply) => {
    reply.send((await terms.getTerm(request.params.term)).toObject())
});

fastify.setNotFoundHandler((request, reply) => {
    reply.sendFile('index.html');
});

fastify.listen({ host: '0.0.0.0', port: 3002 });