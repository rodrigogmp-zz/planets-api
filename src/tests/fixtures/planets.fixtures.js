const { Types } = require('mongoose');
const faker = require('faker');

const { planetsRepository } = require('../../repositories');
const { Planet } = require('../../models');
const { planetsController } = require('../../controllers');

const randomMongoId = Types.ObjectId();

const samplePlanetsArray = [
  {
    name: faker.name.findName(),
    climate: faker.random.word(),
    ground: faker.random.word()
  },
  {
    name: faker.name.findName(),
    climate: faker.random.word(),
    ground: faker.random.word()
  },
  {
    name: faker.name.findName(),
    climate: faker.random.word(),
    ground: faker.random.word()
  },
];

const createSamplePlanet = async () => {
  const samplePlanet = {
    name: faker.name.findName(),
    climate: faker.random.word(),
    ground: faker.random.word()
  };

  return planetsRepository.create(samplePlanet);
};

const createSamplePlanets = async () => {
  const promises = [];
  samplePlanetsArray.forEach((planet) => {
    promises.push(planetsRepository.create(planet));
  });

  await Promise.all(promises);
};

module.exports = {
  randomMongoId,
  samplePlanetsArray,
  createSamplePlanet,
  createSamplePlanets,
};
