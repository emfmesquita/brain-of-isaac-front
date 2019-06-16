const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  devtool: "cheap-module-eval-source-map",
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "bundle.js"
  },
  plugins: [
    new CopyPlugin([
      { from: "public", to: "." },
      { from: "node_modules/brain-of-isaac-commons/public", to: "." }
    ]),
  ],
  devServer: {
    contentBase: "./dist"
  }
};
