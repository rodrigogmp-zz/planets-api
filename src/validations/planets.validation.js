const yup = require('yup');

const list = {
  query: yup.object().shape({
    page: yup
      .number()
      .integer()
      .default(1),
    perPage: yup
      .number()
      .integer()
      .default(10),
    sortBy: yup
      .string()
      .matches(/[:](asc|desc)/i, "sorting order must be one of the following: 'asc' or 'desc'")
      .default('createdAt:desc'),
    name: yup
      .string()
      .default('')
  }),
};

const get = {
  params: yup.object().shape({
    id: yup.string().matches(/^[0-9a-fA-F]{24}$/, 'id must be a valid mongo id'),
  }),
};

const getByName = {
  params: yup.object().shape({
    name: yup.string().matches(/^[a-zA-Z\s]*$/, 'name must contains only letters'),
  }),
}

const create = {
  body: yup.object().shape({
    name: yup.string().required(),
    climate: yup.string().required(),
    ground: yup.string().required(),
  }),
};

const update = {
  params: yup.object().shape({
    id: yup.string().matches(/^[0-9a-fA-F]{24}$/, 'id must be a valid mongo id'),
  }),
  body: yup.object().shape({
    name: yup.string(),
    climate: yup.string(),
    ground: yup.string()
  }),
};

const destroy = {
  params: yup.object().shape({
    id: yup.string().matches(/^[0-9a-fA-F]{24}$/, 'id must be a valid mongo id'),
  }),
};

module.exports.planets = {
  list,
  get,
  getByName,
  create,
  update,
  destroy,
};
