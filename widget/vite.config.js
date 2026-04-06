import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/main.js',
            name: 'Bewegungs Glossar',
            fileName: () => 'movement-glossary.js',
            formats: ['iife']
        },
        target: 'es2017',
        minify: 'esbuild',
        rollupOptions: {
            output: { compact: true }
        }
    }
});
