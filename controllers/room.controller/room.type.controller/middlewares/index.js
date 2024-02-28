const create = require("./create");

//Gathering room type controllers
const createRoomTypeController = (roomTypeModel) => {
  const roomTypeController = {};

  roomTypeController.create = (req, res) => create(roomTypeModel, req, res);

  return roomTypeController;
};

module.exports = createRoomTypeController;
