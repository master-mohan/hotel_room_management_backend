const { CRUD } = require("../../../../models/crud.model");
const Joi = require("joi");
const {
  facilitiesModel,
} = require("../../../../models/helpers/facilities.crud.definition");

const objectSchema = Joi.object({
  typeName: Joi.string().required(),
  totalAdult: Joi.number().required(),
  totalChild: Joi.number().required(),
  roomCapacity: Joi.number().required(),
  price: Joi.number().required(),
  size: Joi.string().required(),
  view: Joi.string().required(),
  bedStyle: Joi.string().required(),
  discount: Joi.number().required(),
  shortDesc: Joi.string().required(),
  description: Joi.string().required(),
  facilitiesId: Joi.array().required(),
});

const create = async (roomTypeModel, req, res) => {
  const { facilitiesId } = req.body;
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

  //before creating room type check for available facilities with the given facility id's
  const checkFacility = await CRUD.findAll(facilitiesModel, {
    _id: { $in: facilitiesId },
    isActive: true,
  });
  
  if (checkFacility.length !== facilitiesId.length) {
    return res.status(401).json({
      success: false,
      result: null,
      message: "Please select valid facilities",
      controller: "Facilities validation",
    });
  }

  //Create the room type document
  const result = await CRUD.create(roomTypeModel, req.body);

  return res.status(200).send({
    success: true,
    result: result,
    message: "Room Type document saved correctly",
  });
};

module.exports = create;
