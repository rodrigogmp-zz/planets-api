const { StatusCodes } = require('http-status-codes');
const { planetsRepository } = require('../../repositories');
const { ApplicationError } = require('../../utils');
const { messages } = require('../../helpers');

module.exports.get = async (id) => {
  const planet = await planetsRepository.getById(id);
  if (!planet) {
    throw new ApplicationError(messages.notFound('planet'), StatusCodes.NOT_FOUND);
  }

  return planet;
};
