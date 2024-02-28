const mongoose = require("mongoose");

const definition = {
  id: {
    type: String,
    unique: true,
  },
  facilityName: {
    type: String,
    unique: true,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
};

const facilitiesSchema = mongoose.Schema(definition, { timestamps: true });

facilitiesSchema.pre("save", function () {
  this.id = this._id;
});

const facilitiesModel = mongoose.model("facilities", facilitiesSchema);

module.exports = { facilitiesModel };
