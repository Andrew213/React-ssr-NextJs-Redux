require('dotenv').config();
const fs = require('fs');
const path = require('path');
const appDirectory = fs.realpathSync(process.cwd());
const withImages = require('next-images');

const myAlias = {
  '@': path.resolve(appDirectory, './src'),
  '@hooks': path.resolve(appDirectory, './src/hooks'),
  '@store': path.resolve(appDirectory, './src/store'),
  '@icons': path.resolve(appDirectory, './src/icons'),
  '@img': path.resolve(appDirectory, './public/img'),

}

module.exports = {
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL_INTERNAL,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_NAME: process.env.CLIENT_NAME,
    CLIENT_PASSWORD: process.env.CLIENT_PASSWORD,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {


    config.resolve.alias = Object.assign({}, config.resolve.alias, myAlias)
    config.module.rules.push({
      test: /\.svg$/,
      use: [{
        loader: "@svgr/webpack",
        options: {
          svgoConfig: { plugins: [{ removeViewBox: false }] },
        }
      }]
    });
    return config
  },

  sassOptions: {
    includePaths: ['./src'],
    prependData: `@import "~@styles/variables.scss";`,
  },
  images: {
    domains: ['b.thumbs.redditmedia.com', 'a.thumbs.redditmedia.com', 'e.thumbs.redditmedia.com', 'styles.redditmedia.com', 'www.redditstatic.com'],
  },
}
