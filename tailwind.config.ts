import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    darkMode: 'false',
    extend: {
      backgroundImage: {},
      fontFamily:{
        primary:["satoshi"]
      }
    },
  },
  plugins: [],
}
export default config
