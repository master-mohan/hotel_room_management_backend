const create = require("./create");

const createFacilitiesController = (facilitiesModel) => {
  const facilitiesController = {};

  facilitiesController.create = (req, res) => create(facilitiesModel, req, res);

  return facilitiesController;
};

module.exports = createFacilitiesController;
