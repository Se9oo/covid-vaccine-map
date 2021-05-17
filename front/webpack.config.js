const path = require('path');
const webpack = require('webpack');

module.exports = {
  name: 'Covid-Vaccine-Map',
  mode: 'development',
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  entry: {
    app: ['./src/client'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  browsers: ['> 5% in KR, ie >= 11'],
                },
                debug: true,
              },
            ],
            '@babel/preset-react',
          ],
          plugins: [
            'react-hot-loader/babel',
            [
              'babel-plugin-styled-components',
              {
                displayName: false,
              },
            ],
          ],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/dist',
  },
};
