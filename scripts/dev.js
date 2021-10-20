const express = require('express')
const next = require('next')

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 8080;

const dev = process.env.NODE_ENV = 'development';

const app = next({ dev })
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.all('*', (req, resp) => {
        return handle(req, resp)
    });

    server.listen(DEFAULT_PORT, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${DEFAULT_PORT}`)
    })

})


// const webpack = require('webpack');
// const WebpackDevServer = require('webpack-dev-server');

// const configFactory = require('../config/webpack.config');

// const compiler = webpack(configFactory);

// const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 8080;
// const HOST = process.env.HOST || '0.0.0.0';
// const devServer = new WebpackDevServer(compiler, {
//     hot: true,
//     headers: { 'Access-Control-Allow-Origin': '*' },
//     historyApiFallback: true,
// });

// devServer.listen(DEFAULT_PORT, HOST, err => {
//     if (err) {
//         return console.log(err)
//     }
// })
