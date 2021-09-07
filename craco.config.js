const path = require('path')

module.exports = {
    style: {
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    },
    webpack:{
      alias:{
        '@hooks': path.join(__dirname, 'src/hooks.tsx')
      }
    }
  }