const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = {
   // Tell webpack the root file of
   // our server application.
   entry: './src/client/client.js',
   // Tell webpack where to put the output
   // file that is generated.
   output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'public'),
   },
   // Tell webpack where to put the output
   // file that is generated.
   output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'public'),
   },
   plugins: [
      new ExtractTextPlugin({ 
         filename: './styles/style.css',
         disable: false, 
         allChunks: true 
      }),
   ],};
module.exports = merge(baseConfig, config);