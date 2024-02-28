const { CRUD } = require("../../../../models/crud.model");
const Joi = require("joi");
const {
  roomTypeModel,
} = require("../../../../models/helpers/roomType.crud.definition");

const objectSchema = Joi.object({
  roomNumber: Joi.string().required(),
  roomtypeId: Joi.string().required(),
});

const create = async (roomNumberModel, req, res) => {
  const { roomtypeId } = req.body;

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

  //before creating room number check for available room type with the selected room type id.
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

  //Create the Room number document
  const result = await CRUD.create(roomNumberModel, req.body);

  return res.status(200).send({
    success: true,
    result: result,
    message: "Room Number document saved correctly",
  });
};

module.exports = create;
