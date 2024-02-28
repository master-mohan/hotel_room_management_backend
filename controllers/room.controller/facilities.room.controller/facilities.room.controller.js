const {
  facilitiesModel,
} = require("../../../models/helpers/facilities.crud.definition");
const createFacilitiesController = require("./middlewares");

const facilitiesController = createFacilitiesController(facilitiesModel);

module.exports = facilitiesController;
