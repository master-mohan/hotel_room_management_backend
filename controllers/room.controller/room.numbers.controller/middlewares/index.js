const availableRoomNumbers = require("./availableNumbers.js");
const create = require("./create.js");

//Gathering room number controllers
const createRoomNumberController = (roomNumberModel) => {
  const roomNumberController = {};

  roomNumberController.create = (req, res) => create(roomNumberModel, req, res);
  roomNumberController.availableRoomNumbers = (req, res) => availableRoomNumbers(roomNumberModel, req, res);

  return roomNumberController;
};

module.exports = createRoomNumberController;
