const routes = require('express').Router();
const {signUp} = require('./services/signUp');
const {logIn} = require('./services/login');
const {sessionValidity} = require('./services/sessionValidity');
const {changePassword} = require('./services/changePassword');
const {details} = require('./services/details');
const {logout} = require('./services/logout');
//Not to be exposed via API Gateway Endpoint
routes.post('/admin/signup', signUp);

routes.post('/admin/login', logIn);
routes.get('/admin/session', sessionValidity);
routes.get('/admin/details', details);
routes.delete('/admin/session/:sessionId', logout);
routes.post('/admin/change-password', changePassword);
//routes.put('/admin/forgot-password');
module.exports = routes;
