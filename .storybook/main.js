const path = require('path')
module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "core": {
    "builder": "storybook-builder-vite"
  },
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'vue-style-loader', 'css-loader', 'sass-loader',
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: [
              require('tailwindcss'),
              require('autoprefixer'),
            ],
          },
        },
      ],
      include: path.resolve(__dirname, '../src/'),
    })

    return config;
  },
  async viteFinal(config, { configType }) {
    // customize the Vite config here
    config.resolve.alias['@/'] = path.resolve(__dirname, './src'),
    config.resolve.alias['@components'] = path.resolve(__dirname, '../src/components'),
    config.resolve.alias['@core'] = path.resolve(__dirname, '../src/components/core'),
    config.resolve.alias['@utils'] = path.resolve(__dirname, '../src/utils'),
    config.resolve.alias['@lumiere'] = path.resolve(__dirname, '../src/utils/lumiere')

    // return the customized config
    return config;
},

}