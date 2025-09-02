let path = require("path"), 
HtmlWebpackPlugin = require('html-webpack-plugin'), 
config = {
    entry: './src/index.jsx',
    mode: "development",
    output: {
        path: path.join(__dirname, '/dist'), 
        filename: 'bundle.js' 
    },
     // webpack 5 comes with devServer which loads in development mode
    devServer: {
        port: 9090, //localhost:9090
        historyApiFallback : true //localhost:9090/user - works as a server to respond with index.html for any request
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