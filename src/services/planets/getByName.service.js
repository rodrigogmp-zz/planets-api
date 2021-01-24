const { StatusCodes } = require('http-status-codes');
const { planetsRepository } = require('../../repositories');
const { ApplicationError } = require('../../utils');
const { messages } = require('../../helpers');

module.exports.getByName = async (name) => {
  const planet = await planetsRepository.getByName(name);
  
  if (!planet) {
    throw new ApplicationError(messages.notFound('planet'), StatusCodes.NOT_FOUND);
  }

  return planet;
};
