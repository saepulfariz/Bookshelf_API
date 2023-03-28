const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const port = 9000;


const init = async () => {
    const server = Hapi.server({
        port: port,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            }
        },
    });

    server.route(routes);


    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};


init();