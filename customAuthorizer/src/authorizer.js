'use strict';
var AWS = require('aws-sdk');
var moment = require('moment');
var jwt_decode = require('jwt-decode');


exports.authorizerFunc = async (event, context) => {

	var token = event.authorizationToken;
	var methodArn = event.methodArn;

	var decodedToken = jwt_decode(token);

	console.log(new Date().toString());

	const po = {
		principalId: 'user',
		policyDocument: { 
			Version: '2012-10-17', 
			Statement: {
				Action: 'execute-api:Invoke',
				Effect: decodedToken.username === 'aaa' ? "Allow" : "Deny",
				Resource: methodArn
			} 
		}
	}      

	return po;
};
