const path = require('path');

module.exports = {
  plugins: {
    tailwindcss: require(path.resolve(__dirname, 'node_modules/tailwindcss')),
    autoprefixer: require(path.resolve(__dirname, 'node_modules/autoprefixer')),
  },
};

