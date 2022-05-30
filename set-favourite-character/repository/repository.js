const moment = require('moment');
const env = require('../common/environment')
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const { v4: uuidv4 } = require('uuid');

const repository = {

    save(personaje_id, motivo) {
        let params = {
            TableName: env.db.table,
            Item: {
                id : uuidv4(),
                personaje_id,
                motivo,
                created: moment().format(),
            },
        };
        return new Promise((resolve, reject) => {
            db.put(params, (err, data) => {
                if (err) {
                    console.log('Error en Query: ', err);
                    return resolve(false);
                }
                console.log('Token ha sido guardado con éxito')
                return resolve(true);
            });
        });
    }
}

module.exports = repository;