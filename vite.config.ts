import vue from '@vitejs/plugin-vue';
import path from 'path';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';
export default defineConfig({
  envDir :  path.resolve(__dirname , './env'),
	plugins: [
		vue(),
		eslintPlugin({
			fix: true,
			cache: false,
			include: [
				'src/**/*.vue',
				'src/**/*.ts',
				'src/**/*.js'
			],
		}),
		stylelint({
      // recommend to enable auto fix
			fix: true,
			cache: false
		}),
		Components({
			resolvers: [
				AntDesignVueResolver({
					importStyle: false, // css in js
				}),
			],
		}),
	],
	server: {
		port: 8085,
		host: '0.0.0.0',
		open: true,
		proxy: {
			'/api': {
				target: 'http://localhost:8081',
				changeOrigin: true,
				rewrite: (path)=> path.replace(/^\/api/, '')
			},
		}
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	css: {
		preprocessorOptions: {
			less: {
				additionalData: `@import "@/assets/css/variables.less";`
			}
		}
	}
})
