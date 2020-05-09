const app = require('./app');
const awsServerlessExpress = require('aws-serverless-express');
const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);

// exports
//   .handler(event)
//   .then(data => console.log(data))
//   .catch(e => console.log(e));

//Methods to be added
//1.SignIn
//2.SignOut
//3.Change-Password
//4.Forgot-Password
//5.User Details
