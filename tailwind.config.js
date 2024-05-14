// @type {import('tailwindcss').Config}
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a","950":"#172554"},
        "finhubprimary-2": "var(--finhubprimary-2)",
        "finhubprimary-color": "var(--finhubprimary-color)",
        "finhubsecondary-1": "var(--finhubsecondary-1)",
        "finhubsecondary-2": "var(--finhubsecondary-2)",
        "finhubsecondary-3": "var(--finhubsecondary-3)",
        neutralnutral: "var(--neutralnutral)",
        "neutralnutral-01": "var(--neutralnutral-01)",
        "neutralnutral-02": "var(--neutralnutral-02)",
        "neutralnutral-03": "var(--neutralnutral-03)",
        "neutralnutral-04": "var(--neutralnutral-04)",
        "neutralnutral-05": "var(--neutralnutral-05)",
        "neutralnutral-06": "var(--neutralnutral-06)",
        "neutralnutral-07": "var(--neutralnutral-07)",
        "neutralnutral-08": "var(--neutralnutral-08)",
        "neutralnutral-09": "var(--neutralnutral-09)",
        "neutralnutral-10": "var(--neutralnutral-10)",
        "neutralnutral-11": "var(--neutralnutral-11)",
        "neutralnutral-12": "var(--neutralnutral-12)",
        "primaryprimary-01": "var(--primaryprimary-01)",
        "primaryprimary-02": "var(--primaryprimary-02)",
        "primaryprimary-03": "var(--primaryprimary-03)",
        "primaryprimary-04": "var(--primaryprimary-04)",
        "primaryprimary-05": "var(--primaryprimary-05)",
        "primaryprimary-06": "var(--primaryprimary-06)",
        "primaryprimary-07": "var(--primaryprimary-07)",
        "primaryprimary-08": "var(--primaryprimary-08)",
        "primaryprimary-09": "var(--primaryprimary-09)",
        "secondary-1secondary-101": "var(--secondary-1secondary-101)",
        "secondary-1secondary-102": "var(--secondary-1secondary-102)",
        "secondary-1secondary-103": "var(--secondary-1secondary-103)",
        "secondary-1secondary-104": "var(--secondary-1secondary-104)",
        "secondary-1secondary-105": "var(--secondary-1secondary-105)",
        "secondary-1secondary-106": "var(--secondary-1secondary-106)",
        "secondary-1secondary-107": "var(--secondary-1secondary-107)",
        "secondary-1secondary-108": "var(--secondary-1secondary-108)",
        "secondary-1secondary-109": "var(--secondary-1secondary-109)",
        "secondary-2secondary-201": "var(--secondary-2secondary-201)",
        "secondary-2secondary-202": "var(--secondary-2secondary-202)",
        "secondary-2secondary-203": "var(--secondary-2secondary-203)",
        "secondary-2secondary-204": "var(--secondary-2secondary-204)",
        "secondary-2secondary-205": "var(--secondary-2secondary-205)",
        "secondary-2secondary-206": "var(--secondary-2secondary-206)",
        "secondary-2secondary-207": "var(--secondary-2secondary-207)",
        "secondary-2secondary-208": "var(--secondary-2secondary-208)",
        "secondary-2secondary-209": "var(--secondary-2secondary-209)",
        "secondary-3secondary-301": "var(--secondary-3secondary-301)",
        "secondary-3secondary-302": "var(--secondary-3secondary-302)",
        "secondary-3secondary-303": "var(--secondary-3secondary-303)",
        "secondary-3secondary-304": "var(--secondary-3secondary-304)",
        "secondary-3secondary-305": "var(--secondary-3secondary-305)",
        "secondary-3secondary-306": "var(--secondary-3secondary-306)",
        "secondary-3secondary-307": "var(--secondary-3secondary-307)",
        "secondary-3secondary-308": "var(--secondary-3secondary-308)",
        "secondary-3secondary-309": "var(--secondary-3secondary-309)",
      }
    },
    fontFamily: {
        'body': [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ],
        'sans': [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ]
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

