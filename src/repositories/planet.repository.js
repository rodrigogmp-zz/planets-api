const { Planet } = require('../models');

module.exports = {
  list: (query) => Planet.aggregate(query),
  getById: (id) => Planet.findById(id),
  get: (params) => Planet.findOne(params),
  getByName: (name) => Planet.findOne({ name: name}),
  create: (params) => Planet.create(params),
  update: (planet) => planet.save(),
  destroy: (id) => Planet.findByIdAndDelete(id),
};
