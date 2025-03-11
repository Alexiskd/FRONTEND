const path = require('path');

module.exports = {
  entry: './src/index.js', // fichier d'entrée de votre app React
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader', // Assurez-vous d'avoir configuré Babel pour transpiler JSX/ES6
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  mode: 'development', // ou 'production'
};
