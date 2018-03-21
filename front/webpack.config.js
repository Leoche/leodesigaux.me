// Variables
const outputPath = '../public'
const assetPath = './src'
const dev = process.env.NODE_ENV !== 'production'

// Dependencies
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ManifestPlugin = require('webpack-manifest-plugin')
const extractCSS = new ExtractTextPlugin({
  filename: 'main.css',
  disable: dev
})
const HtmlWebpackPlugin = require('html-webpack-plugin')
// Load configuration from a .env
// require('dotenv').config({path: path.resolve(process.cwd(), '.env')})

// The brain
const config = {
  entry: {
    main: [
      `${assetPath}/css/main.scss`,
      `${assetPath}/js/main.js`
    ]
  },
  mode: dev ? 'development' : 'production',
  // devtool: dev ? 'cheap-module-eval-source-map' : false,
  externals: {
    // jquery: 'jQuery'
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
    overlay: true,
    clientLogLevel: 'warning'
    // host: 0.0.0.0
  },
  output: {
    path: path.resolve(__dirname, outputPath),
    filename: '[name].js',
    publicPath: dev ? `http://localhost:8080/` : '/'
  },
  resolve: {
    extensions: ['.jsx', '.js', '.ts', '.tsx'],
    alias: {
      '~': path.resolve('node_modules'),
      '@': path.resolve('src')
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: !dev,
                sourceMap: dev
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: dev
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: dev
              }
            }
          ]
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf|wav)(\?.*)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: `[name].[ext]`,
            useRelativePath: !dev
          }
        }]
      },
      {
        test: /\.html$/,
        use: [ {
          loader: 'html-loader',
          options: {
            minimize: false,
            removeComments: false,
            interpolate: true,
            collapseWhitespace: false
          }
        }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({filename: 'index.html', inject: true, template: 'src/html/index.html'}),
    new HtmlWebpackPlugin({filename: 'blog.html', inject: true, template: 'src/html/blog.html'}),
    new HtmlWebpackPlugin({filename: 'labs.html', inject: true, template: 'src/html/labs.html'}),
    new HtmlWebpackPlugin({filename: 'contact.html', inject: true, template: 'src/html/contact.html'}),
    new HtmlWebpackPlugin({filename: 'post.html', inject: true, template: 'src/html/post.html'}),
    new HtmlWebpackPlugin({filename: 'lab.html', inject: true, template: 'src/html/lab.html'}),
    new HtmlWebpackPlugin({filename: 'realisations.html', inject: true, template: 'src/html/realisations.html'}),
    extractCSS,
    new CopyWebpackPlugin([
      { from: 'favicon.ico', to: outputPath },
      { from: 'favicon.png', to: outputPath }
    ])
  ]
}

// Env specific plugins
if (dev) {
  config.plugins.push(new BundleAnalyzerPlugin({openAnalyzer: false}))// default port 8888
} else {
  config.plugins.push(new ManifestPlugin())
}

module.exports = config
