const path = require('path')
const webpack = require('webpack')
const DIST_DIR = path.resolve(__dirname, 'dist')
const SRC_DIR = path.resolve(__dirname, 'src')
const config = {
  mode: 'development',
  entry: ['babel-polyfill', SRC_DIR + '/client.js'],
  output: {
    path: DIST_DIR + '/app',
    filename: 'bundle.js',
    publicPath: '/app/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'API_TOKEN': JSON.stringify(process.env.API_TOKEN)
      }
    })
  ],
  resolve: {
    extensions: [
      '.webpack.js',
      '.web.js',
      '.js',
      '.json',
      '.jsx'
    ]
  },
  module: {
    rules: [
      {
        test: /\.js?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-2']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
    ]
  },
  devServer: {
    proxy: {
      '/': 'http://localhost:3000'
    }
  }
}
module.exports = config
