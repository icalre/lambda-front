/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    "50": "#eff6ff",
                    "100": "#dbeafe",
                    "200": "#bfdbfe",
                    "300": "#93c5fd",
                    "400": "#60a5fa",
                    "500": "#3b82f6",
                    "600": "#39207c80",
                    "700": "#39207c",
                    "800": "#1e40af",
                    "900": "#FBFBFB"
                },
                "modal": "#00000080"
            }
        },
    },
    safelist: [
        'ml-5'
    ],
    plugins: [],
}

