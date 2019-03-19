const employeeRoutes = require('./employee-routes');

exports.configureRoutes = ( server ) => {
    let serverRoutes = employeeRoutes.getAllRoutes();
    let defaultRoute = { 
        method: 'GET',
        path: '/',
        handler: () => {
            return `Learning hapi`;
        }
    };
    serverRoutes.push( defaultRoute );
    return server.route(serverRoutes);
}