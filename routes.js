const routes = require('express').Router();
const {signUp} = require('./services/signUp');
//Not to be exposed via API Gateway Endpoint
routes.post('/admin/signup', signUp);

routes.post('/admin/login');
routes.get('/admin/logout');
routes.delete('/admin/change-password');
routes.put('/admin/forgot-password');
module.exports = routes;
