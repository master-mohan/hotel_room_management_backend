const { bookingsModel } = require("../../../models/helpers/bookings.crud.definition");
const createRoomBookingController = require("./middlewares");

//creating room number controller
const roomBookingController = createRoomBookingController(bookingsModel);

module.exports = roomBookingController;