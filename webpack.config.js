const path = require(`path`);

module.exports = {
  entry: `./src/index.js`,
  output: {
    path: path.join(__dirname, `public`),
    filename: `bundle.js`,
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    open: true,
    port: 8000,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: [`.js`, `.jsx`],
        },
        use: {
          loader: `babel-loader`,
        }
      }
    ]
  },
  devtool: `source-map`,
};
