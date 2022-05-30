const service = require('./service/service');

exports.handler = async (event) => {
  console.log(event)
  let validate = service.validateParams(event);
  let response = await service.getResults(validate.body);
  return response;
};
