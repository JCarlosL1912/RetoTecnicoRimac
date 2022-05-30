const env = require('../common/environment')
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

const repository = {
    async getAll() {
        const params = {
            TableName: env.db.table,
        };
        let data = await db.scan(params).promise();
        return data.Items;
    }

}

module.exports = repository;
