const successCodes = {
  signUpSuccess: {
    code: 101,
    statusCode: 201
  },
  signInSuccess: {
    code: 102,
    statusCode: 200
  },
  changePasswordSuccess: {
    code: 103,
    statusCode: 200
  },
  forgotPasswordSuccess: {
    code: 104,
    statusCode: 200
  }
};

const errorCodes = {
  default: {
    statusCode: 500,
    code: 151
  },
  joi: {
    statusCode: 400,
    code: 152
  },
  userNotFound: {
    statusCode: 404,
    code: 153
  },
  userAlreadyExists: {
    statusCode: 400,
    code: 154
  }
};
module.exports = {errorCodes, successCodes};
