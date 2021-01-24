const { create } = require('./create.service');
const { list } = require('./list.service');
const { get } = require('./get.service');
const { getByName } = require('./getByName.service');
const { update } = require('./update.service');
const { destroy } = require('./destroy.service');

module.exports = {
  list,
  get,
  getByName,
  create,
  update,
  destroy,
};
