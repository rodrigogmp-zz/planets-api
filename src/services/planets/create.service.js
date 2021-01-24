const { StatusCodes } = require('http-status-codes');
const { planetsRepository } = require('../../repositories');
const { ApplicationError } = require('../../utils');
const { messages } = require('../../helpers');
const swapi = require('swapi-node');

module.exports.create = async (params) => {
  const planetExists = await planetsRepository.get({ name: params.name });
  if (planetExists) {
    throw new ApplicationError(messages.alreadyExists('name'), StatusCodes.CONFLICT);
  }

  let [ swPlanet ] = await swapi.get('https://swapi.dev/api/planets').then((result) => {
    return result.results.filter((planet) => {
      return planet.name === params.name;
    })
  });

  if (swPlanet) {
    params['filmAppearancesAmount'] = swPlanet.films.length;
  }

  return planetsRepository.create(params);
};
