const { planetsRepository } = require('../../repositories');
const { queryHelper } = require('../../helpers');

module.exports.list = async (options) => {
  const query = queryHelper(options);

  query[0].$facet.data.push({ $project: { password: 0, __v: 0 } });
  const [{ metadata, data }] = await planetsRepository.list(query);


  let finalMetadata;
  
  if(!metadata) {
    finalMetadata = { total: 0 };
  } else {
    finalMetadata = metadata;
  }

  const totalPages = Math.ceil( finalMetadata.total / options.perPage);

  return {
    metadata: {
      ...finalMetadata,
      totalPages,
      ...(options.page > 1 && { previousPage: options.page - 1 }),
      ...(options.page < finalMetadata.total || 0 && options.page < totalPages && { nextPage: options.page + 1 }),
    },
    data,
  };
};
