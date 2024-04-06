import type { Config } from "tailwindcss";
const Colors = {
  primary: { "50": "#eff6ff", "100": "#dbeafe", "200": "#bfdbfe", "300":
        "#93c5fd", "400": "#60a5fa", "500": "#3b82f6", "600": "#2563eb", "700": "#1d4ed8", "800": "#1e40af", "900": "#1e3a8a" }
}
const FontFamily = {
  'sans': ['Outfit', 'ui-sans-serif', 'system-ui', '-apple-system',
    'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans',
    'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
      'body': ['Outfit', 'ui-sans-serif', 'system-ui',
        '-apple-system', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue',
        'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
      'mono': ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace']
}
const config: Config = {
  content: [
    "./node_modules/flowbite-react/lib/**/*.js",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'w-64',
    'w-1/2',
    'rounded-l-lg',
    'rounded-r-lg',
    'bg-gray-200',
    'grid-cols-4',
    'grid-cols-7',
    'h-6',
    'leading-6',
    'h-9',
    'leading-9',
    'shadow-lg',
    'bg-opacity-50',
    'dark:bg-opacity-80'
  ],
  theme: {
    root: {
      base: "h-full text-primary-900 dark:text-primary-50 bg-primary-50 dark:bg-primary-900",
      collapsed: {
        on: "w-16",
        off: "w-64"
      },
      inner: "h-full overflow-x-hidden rounded bg-white-50 py-4 px-3 dark:bg-gray-800"
    },
    extend: {
      variants: {
        border: ['dark']
      },
      colors: Colors,
      fontFamily: FontFamily,
      transitionProperty: {
        'width': 'width'
      },
      textDecoration: ['active'],
      minWidth: {
        'kanban': '28rem'
      },
      height: {
        'text-area': '25vh',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')({
      charts: true,
    }),
  ],
};
export default config;
