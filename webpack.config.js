const path = require('path');
const webpack = require('webpack');

const configs = {
    entry: ['babel-polyfill', path.join(__dirname, 'app', 'app')],
    output: {
        filename: 'webpack-bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
                    {
                        test: /\.js$/,
                        exclude: /(node_mobules)/,
                        loader: 'babel-loader',
                        query: {
                            presets: ['es2015', 'react', 'stage-0']
                        }
                    },
                    {
                        test: /\.css$/,
                        loader: 'style-loader!css-loader'
                    },
                    {
                        test: /\.scss$/,
                        loader: "style-loader!css-loader!sass-loader"
                    },
                    {
                        test: /\.(png|jp(e*)g|svg)$/,  
                        use: [{
                            loader: 'url-loader',
                            options: { 
                                limit: 8000, // Convert images < 8kb to base64 strings
                                name: 'images/[hash]-[name].[ext]'
                            } 
                        }]
                    }
            ]
    },
    mode: 'development',
    watch: true,
    devServer: {
        publicPath: path.join('/')
    },
    plugins: [
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.$': 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
};

module.exports = configs;