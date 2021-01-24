const { StatusCodes } = require('http-status-codes');
const { catchAsync } = require('../utils');
const { planetsService } = require('../services');
const swapi = require('swapi-node');


module.exports = {
  list: catchAsync(async (req, res) => {
    const { page, perPage, sortBy, name } = req.query;
    
    const response = await planetsService.list({ page, perPage, sortBy, name });
    
    if (!response || response.data.length === 0) {
      return res.status(StatusCodes.NO_CONTENT).end();
    }

    return res.status(StatusCodes.OK).json(response);
  }),

  get: catchAsync(async (req, res) => {
    const { id } = req.params;
    const response = await planetsService.get(id);
    return res.status(StatusCodes.OK).json(response);
  }),

  getByName: catchAsync(async (req, res) => {
    const { name } = req.params;
    
    const response = await planetsService.getByName(name);
    return res.status(StatusCodes.OK).json(response);
  }),

  create: catchAsync(async (req, res) => {
    const { body } = req;
    const response = await planetsService.create(body);

    return res.status(StatusCodes.CREATED).json(response);
  }),

  update: catchAsync(async (req, res) => {
    const {
      params: { id },
      body,
    } = req;
    const response = await planetsService.update(id, body);
    return res.status(StatusCodes.OK).json(response);
  }),

  destroy: catchAsync(async (req, res) => {
    const { id } = req.params;
    await planetsService.destroy(id);
    return res.status(StatusCodes.NO_CONTENT).end();
  }),
};
