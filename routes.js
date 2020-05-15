const routes = require('express').Router();
const {signUp} = require('./services/signUp');
const {logIn} = require('./services/login');
const {sessionValidity} = require('./services/sessionValidity');
//Not to be exposed via API Gateway Endpoint
routes.post('/admin/signup', signUp);

routes.post('/admin/login', logIn);
routes.get('/admin/session', sessionValidity);
routes.get('/admin/logout');
routes.delete('/admin/change-password');
routes.put('/admin/forgot-password');
module.exports = routes;
