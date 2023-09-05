// vite.config.js
import {resolve} from 'path'
import {defineConfig} from 'vite'
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        },
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/main.js'),
            name: 'CoordyVue',
            fileName: "coordy-vue",
            formats: ['cjs', 'esm', 'iife'],
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                assetFileNames: "coordy-vue.css",
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
    plugins: [vue()],
})