const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin'); 

module.exports = {
  entry: {
    app:  ["regenerator-runtime/runtime.js", "./src/index.tsx"],
    vendor: ["react", "react-dom"],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "js/[name].bundle.js",
  },
  devtool: "source-map",
  node: {
    global: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    fallback: {
      http: require.resolve('stream-http'),
    },
  
  },
  devServer: {
    contentBase: "./dist",
    port: 8000,
  },
  module: {
    
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: "/node_modules",
        loader: "babel-loader",
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({template: './src/index.html'}), new NodePolyfillPlugin()]
};
