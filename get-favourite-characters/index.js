const service = require('./service/service');

exports.handler = async (event) => {
  console.log(event)
  let response = await service.getAll();
  return response;
};
