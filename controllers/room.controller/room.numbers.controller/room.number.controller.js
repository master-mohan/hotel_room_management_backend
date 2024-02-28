const {roomNumberModel} = require("../../../models/helpers/roomNumbers.crud.definition");
const createRoomNumberController = require("./middlewares");

//creating room number controller
const roomNumberController = createRoomNumberController(roomNumberModel);

module.exports = roomNumberController;