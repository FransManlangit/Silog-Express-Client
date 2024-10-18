/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
        'serif': ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        'mono': ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
        'montserrat': ['"Montserrat"', 'sans-serif'],
        'roboto': ['"Roboto"', 'sans-serif'],
        'poppins': ['"Poppins"', 'sans-serif'],
        'openSans': ['"Open Sans"', 'sans-serif'],
        'lato': ['"Lato"', 'sans-serif'],
        'playfair': ['"Playfair Display"', 'serif'],
        'raleway': ['"Raleway"', 'sans-serif'],
        'georgia': ['Georgia', 'serif'],
        'times': ['"Times New Roman"', 'serif'],
        'cursive': ['"Dancing Script"', 'cursive']
      },
    },
  },
  plugins: [],
};
