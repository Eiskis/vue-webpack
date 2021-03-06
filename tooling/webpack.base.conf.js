
// Base conf
var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('./env')
var vueLoaderConfig = require('./vue-loader.conf')

// Plugins
var SvgPlugin = require('external-svg-sprite-loader/lib/SvgStorePlugin')

// Path helper
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// Load custom values from manifest
var normalizedConfig = require('./custom-config.js')
var unresolvedAliases = require('../src/config/config.aliases')

// FIXME: htmllinter-loader has some issues, but we should include it here
// var htmllintOptions = {
// 	config: resolve('src/.htmllintrc')
// };



// Apply configuration

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css', '.scss'],
		alias: normalizedConfig.customAliases
  },
	plugins: [
		new SvgPlugin(),
		new webpack.ProvidePlugin({
        _: 'underscore'
    })
	],
  module: {
    rules: [

      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve(unresolvedAliases['@spec']), resolve('src'), resolve('tooling/e2e'), resolve('tooling/unit')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },

      // {
      //   test: /\.vue$/,
      //   loader: 'htmllint-loader',
      //   enforce: 'pre',
      //   options: htmllintOptions,
      //   include: [resolve('src'), resolve('tooling/e2e'), resolve('tooling/unit')]
      // },

      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve(unresolvedAliases['@spec']), resolve('src'), resolve('tooling/e2e'), resolve('tooling/unit')]
      },

      // htmllinting
      // {
      //   test: /\.html$/,
      //   loader: 'htmllint-loader',
      //   enforce: 'pre',
			// 	options: htmllintOptions,
      //   include: [resolve('src'), resolve('tooling/e2e'), resolve('tooling/unit')]
      // },

			// SVG optimisation and compilation
			{
				test: /\.svg$/,
				use: [

					// https://www.npmjs.com/package/external-svg-sprite-loader
					{
						loader: 'external-svg-sprite-loader',
						options: {
							name: normalizedConfig.svgSpritePath,
							iconName: '[name]',
							svgoOptions: normalizedConfig.svgo
						}
					}

				]
			},

			// Independent EJS template files
      {
        test: /\.ejs$/,
        loader: 'ejs-loader',
        include: [resolve('src'), resolve('tooling/e2e'), resolve('tooling/unit')]
      },

      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
