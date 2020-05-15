const {dynamoDb} = require('../dbConfig/dynamoDb');
const {errorCodes, successCodes} = require('../utils/responseCodes');
const sessionValidity = async (req, res) => {
  //To be encrypted later
  const {sessionId} = req.query;
  //Validation additoion pending
  const params = {
    TableName: process.env.ADMIN_SESSIONS_TABLE,
    KeyConditionExpression: 'sessionId = :id',
    ExpressionAttributeValues: {
      ':id': sessionId
    },
    ProjectionExpression: 'sessionId'
  };
  const sessionExists = await dynamoDb.query(params);
  let response;
  if (sessionExists.Items.length) {
    response = successCodes['sessionValid'];
  } else response = errorCodes['sessionInvalid'];
  return res.status(response.statusCode).send({
    statusCode: response.statusCode,
    code: response.code
  });
  //Error handler to be added
};

module.exports = {sessionValidity};
