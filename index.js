'use strict';

const SERVER_PORT = 3000;
const SERVER_HOST = `localhost`;

const Hapi = require('hapi');

const routes = require('./routes');

const server = new Hapi.server({
    port: SERVER_PORT,
    host: SERVER_HOST
});

const options = {
    ops: {
        interval: 1000
    },
    reporters:{
        myConsoleReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*' }]
        }, {
            module: 'good-console'
        }, 'stdout'],
        myFileReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ ops: '*' }]
        }, {
            module: 'good-squeeze',
            name: 'SafeJson'
        }, {
            module: 'good-file',
            args: ['./logs/server-log.log']
        }],
        myHTTPReporter:[{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ error: '*' }]
        }
        /*{
            module: 'good-http',
            args: ['http://prod.logs:3000', {
                wreck: {
                    headers: { 'x-api-key': 12345 }
                }
            }]
        }*/
    ]
    }
};

const init = async () => {
    await server.register({
        plugin: require('good'),
        options,
    });
    await routes.configureRoutes( server );
    await server.start();
    return server;
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init().then(server => {
    server.log(`Server running at: ${ server.info.uri }`)
  }).catch(err => {
    server.log(err)
    process.exit(1)
  });

