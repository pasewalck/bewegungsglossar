import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/main.js',
            name: 'bewegungsglossar',
            fileName: () => 'movement-glossary.js',
            formats: ['cjs']
        },
        target: 'es2017',
        minify: 'esbuild'
    }
});
