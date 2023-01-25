/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				dark: {
					100: '#e1e1e1',
					200: '#9b9b9b',
					800: '#242424',
					900: '#1a1a1a'
				}
			}
		}
	},
	plugins: []
};
