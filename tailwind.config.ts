import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './website/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'product-primary': '#FF6D3F',
        'product-primary-light': '#FF9877',
        'product-primary-dimmed': '#FF480E',
        'product-secondary': '#3F80FF',
        'product-secondary-light': '#75A4FF',
        'product-secondary-dimmed': '#256FFF',
        'product-light': '#FFFFFF',
        'product-light-dimmed': '#FCFCFC',
        'activity-red': '#FF4545',
        'activity-red-light': '#FF8181',
        'activity-red-dimmed': '#DD1818',
        'product-dark': '#2F2F2F',
      },
      boxShadow: {
        subtle: '0px 2px 4px 0px #00000008',
      },
    },
  },
  plugins: [],
};
export default config;
