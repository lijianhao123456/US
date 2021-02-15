var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js|\.jsx$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/i,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif|svg|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        quiet: true,
        open: true
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
        // new FriendlyErrorsWebpackPlugin({
        //     compilationSuccessInfo: {
        //         messages: [`Your application is running here: ${config.dev.https ? 'https' : 'http'}://${config.dev.host}:${config.dev.port}`],
        //     },
        //     onErrors: config.dev.notifyOnErrors
        //         ? utils.createNotifierCallback()
        //         : undefined,
        //     clearConsole: true,
        // }),
        // new FriendlyErrorsWebpackPlugin({
        //     // 运行成功/
        //     compilationSuccessInfo: {
        //         message: ['Your application is running here: http://localhost:8080/']
        //     },
        //     clearConsole: true,
        // })
    ]
}