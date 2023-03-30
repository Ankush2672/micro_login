const Hapi = require('@hapi/hapi');
const Plugins = require('./plugins');

const init = async () => {

   // Connection(); // initialize the connection of the database;
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await Plugins(server);

    server.ext('onRequest', function (request, h) {
        console.log(request.url.pathname);
        return h.continue;
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
