/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				darkCyan: 'hsl(180, 29%, 50%)',
				LightGrayishCyanBackground: 'hsl(180, 52%, 96%)',
				LightGrayishCyan: 'hsl(180, 31%, 95%)',
				DarkGrayishCyan: 'hsl(180, 8%, 52%)',
				VeryDarkGrayishCyan: 'hsl(180, 14%, 20%)',
				gray: '#7b8e8e',
				darkGray: '#2c3a3a',
			},
			fontFamily: {
				sans: ['League Spartan', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
