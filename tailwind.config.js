/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.tsx", "./components/**/*.tsx"],
	theme: {
		extend: {
			colors: {
				primary: "var(--primary)",
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
			fontSize: {
				xxs: "0.65rem",
			},
		},
	},
	plugins: [],
};

