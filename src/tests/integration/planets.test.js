const faker = require('faker');
const request = require('supertest');
const { StatusCodes } = require('http-status-codes');
const { messages } = require('../../helpers');

const app = require('../../config/express');
const { version } = require('../../config/env');

const { createSamplePlanets, randomMongoId } = require('../fixtures/planets.fixtures');

const baseURL = `/api/${version}/planets`;

let samplePlanet;

beforeAll(async () => {
  await createSamplePlanets();
});

describe('Planet Endpoints', () => {
  describe('GET /planets?name=uhaeuaheuaheuaheah', () => {
    test('Should return 204', async () => {
      const response = await request(app)
        .get(`${baseURL}?page=50`)

      expect(response.status).toBe(StatusCodes.NO_CONTENT);
    });

    test('Should return a list of planets and metadata', async () => {
      const page = 1;
      const perPage = 10;
      const sortBy = 'createdAt:asc';
      const response = await request(app)
        .get(`${baseURL}?page=${page}&perPage=${perPage}&sortBy=${sortBy}`)

      expect(response.status).toBe(StatusCodes.OK);

      const { body } = response;
      expect(body).toMatchObject({
        metadata: expect.objectContaining({
          total: expect.any(Number),
          totalPages: expect.any(Number),
        }),
        data: expect.any(Array),
      });
    });

    test('Should return a list of planets and metadata (without query params)', async () => {
      const response = await request(app).get(`${baseURL}`);

      expect(response.status).toBe(StatusCodes.OK);

      const { body } = response;
      expect(body).toMatchObject({
        metadata: expect.objectContaining({
          total: expect.any(Number),
          totalPages: expect.any(Number),
        }),
        data: expect.any(Array),
      });
    });

    test('Should return metadata with nextPage params', async () => {
      const page = 1;
      const perPage = 1;
      const sortBy = 'createdAt:asc';
      const response = await request(app)
        .get(`${baseURL}?page=${page}&perPage=${perPage}&sortBy=${sortBy}`)

      expect(response.status).toBe(StatusCodes.OK);

      const { body } = response;
      expect(body).toMatchObject({
        metadata: expect.any(Object),
        data: expect.any(Array),
      });
    });

    test('Should return 400 - Bad Request if sortBy has invalid input', async () => {
      const page = 1;
      const perPage = 10;
      const sortBy = 'createdAtdesc';
      const response = await request(app)
        .get(`${baseURL}?page=${page}&perPage=${perPage}&sortBy=${sortBy}`)

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body).toEqual(
        expect.objectContaining({
          message: messages.invalidFields,
          errors: {
            query: {
              sortBy: "sorting order must be one of the following: 'asc' or 'desc'",
            },
          },
        }),
      );
    });
  });

  describe('POST /planets', () => {
    test('Should create a planet', async () => {
      samplePlanet = {
        name: 'Tatooine',
        climate: faker.random.word(),
        ground: faker.random.word()
      };
    
      const response = await request(app)
        .post(`${baseURL}/`)
        .send(samplePlanet);

      samplePlanet = response.body;

      expect(response.status).toBe(StatusCodes.CREATED);
    });

    test('Should return 409 - Conflict', async () => {
      const params = {
        name: samplePlanet.name,
        climate: faker.random.word(),
        ground: faker.random.word()
      };

      const response = await request(app)
        .post(`${baseURL}/`)
        .send(params);

      expect(response.status).toBe(StatusCodes.CONFLICT);
    });
  });

  describe('GET /planets/:id', () => {
    test('Should return a planet by its id', async () => {
      const response = await request(app)
        .get(`${baseURL}/${samplePlanet._id}`)

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(samplePlanet);
    });

    test('Should return 404 - Not found - Because id dont matches with route regex', async () => {
      const response = await request(app).get(`${baseURL}/1`);
      
      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });

    test('Should return 404 - Not Found', async () => {
      const response = await request(app)
        .get(`${baseURL}/${randomMongoId}`)

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
  });

  describe('GET /planets/:name', () => {
    test('Should return a planet by its name', async () => {
      const response = await request(app)
        .get(`${baseURL}/${samplePlanet.name}`)

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(samplePlanet);
    });

    test('Should return 404 - Not found - Because name dont matches with route regex', async () => {
      const response = await request(app).get(`${baseURL}/n`);
      
      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });

    test('Should return 404 - Not Found', async () => {
      const response = await request(app)
        .get(`${baseURL}/${faker.name}`)

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
  });

  describe('PATCH /planets/:id', () => {
    test('Should update a planet', async () => {
      const params = {
        name: faker.name.findName(),
        climate: faker.random.word(),
        ground: faker.random.word()
      };

      const response = await request(app)
        .put(`${baseURL}/${samplePlanet._id}`)
        .send(params);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.name).toEqual(expect.stringMatching(params.name));
    });

    test('Should return 404 - Not Found', async () => {
      const params = {
        name: 'John Doe',
        email: 'johndoe@planets-api.com.br',
        password: 'P@ssw0rd',
      };

      const response = await request(app)
        .put(`${baseURL}/${randomMongoId}`)
        .send(params);

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
  });

  describe('DELETE /planets/:id', () => {
    test('Should delete a planet', async () => {
      const response = await request(app)
        .delete(`${baseURL}/${samplePlanet._id}`)

      expect(response.status).toBe(StatusCodes.NO_CONTENT);
    });

    test('Should return 404 - Not Found', async () => {
      const response = await request(app)
        .delete(`${baseURL}/${randomMongoId}`)

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
  });
});
