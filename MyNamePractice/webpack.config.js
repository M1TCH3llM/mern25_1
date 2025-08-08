let path = require("path"), //path module of node framework
HtmlWebpackPlugin = require('html-webpack-plugin'), //to load the index html file on request

config = {
    output: {
        path: path.join(__dirname, '/dist'), //dist - distribution
        filename: 'bundle.js' //the file name will be bundle.js
    },
     // webpack 5 comes with devServer which loads in development mode
    devServer: {
        port: 9090, //localhost:9090
        historyApiFallback : true //localhost:9090/user - works as a server to respond with index.html for any reuest
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, //to load js and jsx files
                exclude: /node_modules/, //exclude node_modules folder
                use: {
                  loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/, //to load css files
                use: ['style-loader', 'css-loader'] //use style-loader and css-loader to load css files
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                exclude: /node_modules/,
                type: 'asset/resource',
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })] //localhost:9090 - loads this html
}


module.exports = config; //export the config object to be used by webpack