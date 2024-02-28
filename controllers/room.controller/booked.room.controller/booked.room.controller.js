const {
  bookedRoomModel,
} = require("../../../models/helpers/bookedRoomList.crud.definition");
const createBookedRoomController = require("./middlewares");

//creating room number controller
const bookedRoomController = createBookedRoomController(bookedRoomModel);

module.exports = bookedRoomController;
