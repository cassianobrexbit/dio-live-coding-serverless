'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;

  //const { id, productname } = JSON.parse(event.body);

  const params = {
    TableName: "Items",
    Key: {
      id: "item-01"
    },
    UpdateExpression: "set itemName = :n, itemPrice = :p",
    ExpressionAttributeValues: {
      ":n": "item-0100",
      ":p": 150
    },
    ReturnValues: "UPDATED_NEW"
  };

  try {
    const data = await documentClient.update(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 204;
  } catch(err) {
    responseBody = `Unable to update product: ${err}`;
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json"
    },
    body: responseBody
  };

  return response;
};