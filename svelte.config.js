import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Using node adapter for both frontend and backend functionality
		adapter: adapter(),
		// Enable CSRF protection
		csrf: {
			checkOrigin: true
		}
	}
};

export default config;
