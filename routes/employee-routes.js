const EmployeeHandler = require(`../handlers/employee-handler`);

exports.getAllRoutes = () => {
    let routes = [
        {
            method: 'GET',
            path: '/employees',
            handler: ( req, h ) => {
                return EmployeeHandler.getEmployees( req, h );
            }
        },
        {
            method: 'PUT',
            path: '/employees',
            handler: ( req, h ) => {
              return EmployeeHandler.updateEmployee( req, h );
            }
        },
        {
            method: 'POST',
            path: '/employees',
            handler: ( req, h ) => {
              return EmployeeHandler.insertEmployee( req, h );
            }
        },
        {
            method: 'DELETE',
            path: '/employees/{id}',
            handler: ( req, h ) => {
              return EmployeeHandler.deleteEmployee( req, h );
            }
        }
    ];

    return routes;
};