/** @type {import('tailwindcss').Config} */
import tailwindPlugin from '@feedmepos/ui-library/tailwind-plugin'
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/@feedmepos/ui-library/**',
    './node_modules/@feedmepos/mf-*/**'
  ],
  safelist: [
    {
      pattern: /.-?fm-./
      // pattern: /./ // the "." means "everything"
    }
  ],
  theme: {
    extend: {}
  },
  plugins: [tailwindPlugin]
}