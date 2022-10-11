const webpack = require('webpack');
module.exports = function override(config, env) {

    config.resolve.fallback = {
        url: require.resolve('url'),
        assert: require.resolve('assert'),
        crypto: require.resolve('crypto-browserify'),
        buffer: require.resolve('buffer'),
        os: require.resolve('os-browserify'),
        https: require.resolve("https-browserify"),
        http: require.resolve("stream-http"),
        fs: false
    };
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    );

    return config;
}
