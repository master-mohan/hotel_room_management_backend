const { roomTypeModel } = require("../../../models/helpers/roomType.crud.definition");
const createRoomTypeController = require("./middlewares");

//creating room type controller
const roomTypeController = createRoomTypeController(roomTypeModel);

module.exports = roomTypeController;