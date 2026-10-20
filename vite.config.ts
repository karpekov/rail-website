import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import yaml from '@rollup/plugin-yaml';

export default defineConfig({
	plugins: [sveltekit(), yaml(), purgeCss()],
	server: {
		// Mirror the `rewrites` in vercel.json, which `vite dev` ignores.
		proxy: {
			'/blog/astra-beyond-tabletop': {
				target: 'https://felixzheng02.github.io',
				changeOrigin: true,
				rewrite: (path) =>
					path.replace(/^\/blog\/astra-beyond-tabletop/, '/astra-eval-blog-page')
			}
		}
	}
});
