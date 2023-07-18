/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./components/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            spacing: {
                'h-header': 'var(--h-header)',
            },
            maxWidth: {
                container: '1200px',
            },
            boxShadow: {
                test: '0 0 1px 1px red',
            },
            colors: {
                primary: '#b673f8',
                'primary-dark': '#a358ee',
            },
        },
    },
    plugins: [],
};
