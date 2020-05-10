const {dynamoDb} = require('../dbConfig/dynamoDb');
const {cognito} = require('../cognitoConfig/cognito');
const {validateSchema} = require('../utils/validator');
const {errorCodes, successCodes} = require('../utils/responseCodes');
const {schema} = require('../utils/schema');
const {v4: uuidv4} = require('uuid');
const moment = require('moment');
const changePassword = async (req, res) => {
  try {
    await validateSchema(req.body, schema.changePasswordSchema);
    const {email, password} = req.body;
    if (await checkIfUserExists(email)) {
      const tokens = await cognito.logIn(email, password);
      await addSessionDetails(tokens);
      const response = successCodes['logInSuccess'];
      return res.status(response.statusCode).send({
        statusCode: response.statusCode,
        code: response.code,
        tokens
      });
    } else {
      const response = errorCodes['userNotFound'];
      return res.status(response.statusCode).send({
        statusCode: response.statusCode,
        code: response.code
      });
    }
  } catch (e) {
    //Needed to be defined again
    if (e.code === 'schemaError') {
      const response = errorCodes['joi'];
      return res.status(response.statusCode).send({
        statusCode: response.statusCode,
        code: response.code
      });
    } else {
      //default error
      const response = errorCodes['default'];
      return res.status(response.statusCode).send({
        statusCode: response.statusCode,
        code: response.code
      });
    }
  }
};

const checkIfUserExists = async email => {
  const params = {
    TableName: process.env.ADMIN_TABLE,
    Key: {
      email
    }
  };
  const doesUserExists = await dynamoDb.get(params);
  if (doesUserExists.Item) {
    return true;
  } else return false;
};

const addSessionDetails = async ({idToken, refreshToken}) => {
  const params = {
    sessionId: uuidv4(),
    idToken,
    refreshToken,
    created: moment.utc().format()
  };
  await dynamoDb.create(params);
  return;
};
module.exports = {changePassword};
