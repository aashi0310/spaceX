const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
   // Tell webpack to run babel on every
   // files it runs through.
   module: {
      rules: [
         {
            test: /\.(js|jsx)?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
               presets: [
                  'react',
                  'stage-0',
                  ['env', { 
                     targets: { browsers: ['last 2 versions'] } 
                  }]
               ]
            }
         },
         {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
               fallback: "style-loader",
               use: "css-loader!sass-loader",
            })
         },
      ]
   }
}