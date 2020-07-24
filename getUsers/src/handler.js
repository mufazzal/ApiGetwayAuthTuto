'use strict';
var AWS = require('aws-sdk');
var moment = require('moment');


exports.getUsers = async (event, context) => {
//	AWS.config.credentials = new AWS.SharedIniFileCredentials({profile: 'Mufazzal_Hussain'});
//	AWS.config.update({ region: "us-east-1"});
//  console.log(event, event.queryStringParameters, event.multiValueQueryStringParameters)

	const userData = {
		identity: event.requestContext && event.requestContext.identity ? event.requestContext.identity : '',
		claims: event.requestContext && event.requestContext.authorizer ? event.requestContext.authorizer.claims : ''
	}	
	
	console.log("moment date ->>> ", moment(new Date()).format('MM/DD/YYYY'));
	
	var docClient = new AWS.DynamoDB.DocumentClient();
	var paramsScan = { TableName: process.env.UserTableName, }
	const response = 
		await docClient.scan(paramsScan).
			promise().
			then(function(data, err) {
				if(err) { var res = { 	statusCode: 500, 
										body: JSON.stringify({result: err,  userData: userData}),
										headers: {'Access-Control-Allow-Origin': '*'}
									}; 
						} 
				else  	{ 	  res = { 
										statusCode: 200, 
										body: JSON.stringify({result: data, userData: userData}),
										headers: {'Access-Control-Allow-Origin': '*'}
									};
						}
				return res;
			});
			

	return response;
};
