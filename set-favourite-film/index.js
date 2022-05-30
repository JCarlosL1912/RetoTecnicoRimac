const service = require('./service/service');

exports.handler = async (event) => {
  console.log(event);
  let validate = service.validateParams(event);
  if (validate.statusCode === 400) {
      return validate;
  }
  return await service.setData(validate.body);
};