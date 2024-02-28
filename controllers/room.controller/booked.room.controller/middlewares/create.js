const { CRUD } = require("../../../../models/crud.model");
const Joi = require("joi");
const {
  roomTypeModel,
} = require("../../../../models/helpers/roomType.crud.definition");
const {
  roomNumberModel,
} = require("../../../../models/helpers/roomNumbers.crud.definition");
const {
  bookingsModel,
} = require("../../../../models/helpers/bookings.crud.definition");

const objectSchema = Joi.object({
  bookingId: Joi.string().required(),
  roomtypeId: Joi.string().required(),
  roomNumberId: Joi.string().required(),
});

const create = async (bookedRoomModel, req, res) => {
  const { bookingId, roomtypeId, roomNumberId } = req.body;

  //For validating the input data
  const { error, value } = objectSchema.validate(req.body);

  if (error) {
    return res.status(401).json({
      success: false,
      result: null,
      message: error.message,
      controller: "validation",
    });
  }

  //before creating check for bookings id.
  const checkBookingId = await CRUD.findOne(bookingsModel, {
    _id: bookingId,
    
  });
  console.log("checkBookingId", checkBookingId);
  if (!checkBookingId) {
    return res.status(401).json({
      success: false,
      result: null,
      message: "Please select valid Bookings",
      controller: "",
    });
  }

  //before creating check for room type
  const checkRoomType = await CRUD.findOne(roomTypeModel, {
    _id: roomtypeId,
    isActive: true,
  });

  if (!checkRoomType) {
    return res.status(401).json({
      success: false,
      result: null,
      message: "Please select valid Room Type",
      controller: "RoomType validation",
    });
  }

  //before creating check for room number
  const checkRoomNumber = await CRUD.findOne(roomNumberModel, {
    _id: roomNumberId,
    isActive: true,
  });

  if (!checkRoomNumber) {
    return res.status(401).json({
      success: false,
      result: null,
      message: "Please select valid Room Type",
      controller: "RoomType validation",
    });
  }

  //Create the Room booked document
  const result = await CRUD.create(bookedRoomModel, req.body);

  return res.status(200).send({
    success: true,
    result: result,
    message: "Assigned Room saved correctly",
  });
};

module.exports = create;
