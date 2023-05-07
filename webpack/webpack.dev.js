const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        hot: true,
        open: true,
        port: 3000
    },
    devtool: 'cheap-module-source-map',

    plugins: [
        new webpack.DefinePlugin({
            'process.env.name': JSON.stringify('WIP'),
        }),
        new ReactRefreshWebpackPlugin(),
    ],
}
