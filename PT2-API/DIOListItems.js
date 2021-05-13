'use strict';

const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    
    const documentClient = new AWS.DynamoDB.DocumentClient();
    
    let responseBody = "";
    let statusCode = 0;

    //const {id, itemName, itemPrice} = JSON.parse(event.body);

    const params = {
        TableName: "Items"
    }

    try {
    
        const data = await documentClient.scan(params).promise();
        responseBody = JSON.stringify(data.Items);
        statusCode = 200;
        
    } catch (err) {

        responseBody = `Falha ao listar itens: ${err}`;
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