'use strict';

const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    
    const documentClient = new AWS.DynamoDB.DocumentClient();
    
    let responseBody = "";
    let statusCode = 0;

    //const {id, itemName, itemPrice} = JSON.parse(event.body);

    const params = {
        TableName: "Items",
        Key:{
            id: 'item-01'
        }
    }

    try {
    
        const data = await documentClient.get(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 204;
        
    } catch (err) {

        responseBody = `Falha ao obter item: ${err}`;
        statusCode = 403;

    }

    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json"
        },
        body:responseBody
    };

    return response;
}