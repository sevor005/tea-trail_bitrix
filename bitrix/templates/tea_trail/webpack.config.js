// Webpack v4
const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: { main: './src/index.js' },
  mode: 'development',
  output: {
    path: path.resolve(__dirname),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
        query: {
          // Inline images smaller than 10kb as data URIs
          limit: 10000,
          name: './images/[name].[ext]'
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader',
        query: {
          // Inline images smaller than 10kb as data URIs
          limit: 10000,
          name: './fonts/[name].[ext]'
        },
      }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin('dist', {} ),
    // new ExtractTextPlugin(
    //   {filename: 'style.[hash].css', disable: false, allChunks: true }
    // ),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.php',
      filename: 'header.php'
    }),
    new WebpackMd5Hash()
  ]
};
