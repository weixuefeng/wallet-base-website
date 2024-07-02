/*
 * @Author:  
 * @Date: 2022-10-12 19:07:34
 * @LastEditors:  
 * @LastEditTime: 2024-03-02 12:38:13
 * @FilePath: /wallet-base-website/tailwind.config.js
 */
module.exports = {
  content: [
    // './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,css,scss}',
  ],
  darkMode: 'class', // 'media' is the default, change to 'class' if you want to use dark mode in with class names
  theme: {
    extend: {
      colors: {
        
      },
      backgroundImage: { 
      },
      boxShadow: {
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
