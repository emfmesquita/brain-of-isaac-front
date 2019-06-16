const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "node_modules/brain-of-isaac-commons")
        ],
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
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'images',
            publicPath: 'images',
          },
        }]
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
