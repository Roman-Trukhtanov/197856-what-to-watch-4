const path = require(`path`);

module.exports = {
  entry: `./src/index.tsx`,
  output: {
    path: path.join(__dirname, `public`),
    filename: `bundle.js`,
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    open: true,
    port: 8000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        }
      },
      {
        test: /\.(tsx|ts)?$/,
        loader: `ts-loader`,
      }
    ]
  },
  resolve: {
    extensions: [`.ts`, `.tsx`, `.js`, `.jsx`]
  },
  devtool: `source-map`,
};
