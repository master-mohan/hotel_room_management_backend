const create = require("./create");

//Gathering room number controllers
const createRoomBookingController = (bookingModel) => {
  const roomBookingController = {};

  roomBookingController.create = (req, res) => create(bookingModel, req, res);

  return roomBookingController;
};

module.exports = createRoomBookingController;
