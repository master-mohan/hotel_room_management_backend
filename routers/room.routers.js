const express = require("express");
const facilitiesController = require("../controllers/room.controller/facilities.room.controller/facilities.room.controller.js");
const { catchErrors } = require("../handlers/errorHandlers.js");
const { hasPermission } = require("../controllers/middlewares/permission.js");
const roomTypeController = require("../controllers/room.controller/room.type.controller/room.type.controller.js");
const roomNumberController = require("../controllers/room.controller/room.numbers.controller/room.number.controller.js");
const roomBookingController = require("../controllers/room.controller/booking.controller/room.booking.controller.js");
const bookedRoomController = require("../controllers/room.controller/booked.room.controller/booked.room.controller.js");

const roomRouters = express.Router();

//route to create facility
roomRouters
  .route("/facilities/create")
  .post(hasPermission("admin"), catchErrors(facilitiesController.create));

//route to create room type
roomRouters
  .route("/room/type/create")
  .post(hasPermission("admin"), catchErrors(roomTypeController.create));
  
//route to create room number
  roomRouters
  .route("/room/number/create")
  .post(hasPermission("admin"), catchErrors(roomNumberController.create));

//route to room number availability
roomRouters
  .route("/room/number/available/list")
  .get(hasPermission("admin"), catchErrors(roomNumberController.availableRoomNumbers));
  
//route to create room bookings
roomRouters
  .route("/room/bookings/create")
  .post(hasPermission("admin"), catchErrors(roomBookingController.create));

//route to create room bookings
roomRouters
  .route("/room/assign/create")
  .post(hasPermission("admin"), catchErrors(bookedRoomController.create));

module.exports = roomRouters;
