require('dotenv').config();
const fs = require('fs');
const path = require('path');
const appDirectory = fs.realpathSync(process.cwd());
const withImages = require('next-images');

const myAlias = {
  '@': path.resolve(appDirectory, './src'),
  '@hooks': path.resolve(appDirectory, './src/hooks'),
  '@icons': path.resolve(appDirectory, './src/icons'),
  '@img': path.resolve(appDirectory, './public/img')
}

module.exports = {
  env: {
    API_URL: process.env.API_URL,
    USER_ID: process.env.USER_ID
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {


    config.resolve.alias = Object.assign({}, config.resolve.alias, myAlias)
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    // console.log('###### ', webpack)
    return config
  },

  sassOptions: {
    includePaths: ['./src'],
    prependData: `@import "~@styles/variables.scss";`,
  },
  images: {
    domains: ['b.thumbs.redditmedia.com', 'a.thumbs.redditmedia.com', 'e.thumbs.redditmedia.com'],
  },
}
