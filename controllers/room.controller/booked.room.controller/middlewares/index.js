const create = require("./create");

//Gathering room number controllers
const createBookedRoomController = (bookedRoomModel) => {
  const bookedRoomController = {};

  bookedRoomController.create = (req, res) => create(bookedRoomModel, req, res);

  return bookedRoomController;
};

module.exports = createBookedRoomController;
