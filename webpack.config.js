const path = require('path');
const glob = require('glob');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

// const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// Remove o plugin "CleanWebpackPlugin" para evitar que o wordpress remova os arquivos gerados pelo projeto no bundle
// const plugins = defaultConfig.plugins.filter(item => !(item instanceof CleanWebpackPlugin));

// Adiciona um novo loader nas regras do scss para fazer includes em massa usando "*"
const customRules = defaultConfig.module.rules.map((item) => {
    if (item.test && item.test.test('.scss')) {
        item.use = [...item.use, {loader: 'import-glob-loader'}];
    }
    return item;
});

module.exports = {
    ...defaultConfig,
    entry: glob.sync('./src/blocks/*/frontend/index.js').reduce((acc, path) => {
            const entry = path.replace('/index.js', '')
                .replace('./src/', '').replace('js/', '')

            const entryParsed = entry.split('/')[1] ? entry + '/' + entry.split('/')[1] : entry;

            if (entryParsed && !Array.isArray(entryParsed) && typeof acc[entryParsed] === 'undefined') {
                acc[entryParsed] = path;
                return acc;
            }

            acc[entry] = path
            return acc
        },
        {
            admin: path.resolve(__dirname, 'src/admin/index.js'),
            'editor': path.resolve(__dirname, 'src/blocks/index.js'),
            public: path.resolve(__dirname, 'src/public/index.js'),
        }
    ),
    output: {
        ...defaultConfig.output,
        path: path.resolve(__dirname, 'bundle'),
        publicPath: './',
    },
    module: {
        ...defaultConfig.module,
        rules: customRules,
    },
};
