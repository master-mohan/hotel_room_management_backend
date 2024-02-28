const { CRUD } = require("../../../../models/crud.model");
const Joi = require("joi");

const objectSchema = Joi.object({
  facilityName: Joi.string().required(),
});

const create = async (facilitiesModel, req, res) => {
  const { facilityName, isActive } = req.body;

  //For validating the input data
  const { error, value } = objectSchema.validate({
    facilityName: facilityName,
  });

  if (error) {
    return res.status(401).json({
      success: false,
      result: null,
      message: error.message,
      controller: "validation",
    });
  }

  //Create the facility document
  const result = await CRUD.create(facilitiesModel, {
    facilityName: facilityName,
    isActive: isActive || true,
  });

  return res.status(200).send({
    success: true,
    result: {
      _id: result._id,
      facilityName: result.facilityName,
      isActive: result.isActive,
    },
    message: "Facility document saved correctly",
  });
};

module.exports = create;
