const path = require('path');
module.exports = {
    babel: {
        plugins: [
            'lodash',
            [
                'babel-plugin-direct-import',
                {
                    modules: ['@mui/material', '@mui/icons-material'],
                },
            ],
        ],
    },
    webpack: {
        alias: {
            'lodash-es': 'lodash',
            '@': path.resolve(__dirname, 'src'),
        },
        configure: (webpackConfig, { env }) => {
            if (env !== 'production') {
                return webpackConfig;
            }

            webpackConfig.optimization = {
                ...webpackConfig.optimization,
                runtimeChunk: true,
                splitChunks: {
                    ...webpackConfig.optimization.splitChunks,
                    chunks: 'all',
                },
            };

            return webpackConfig;
        },
    },
};
