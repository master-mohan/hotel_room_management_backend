const mongoose = require("mongoose");

const definition = {
  id: {
    type: String,
    unique: true,
  },
  roomNumber: {
    type: String,
    unique: true,
    required: true,
  },
  roomtypeId: {
    type: mongoose.Schema.ObjectId,
    ref: "roomType",
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
};

const roomNumberSchema = mongoose.Schema(definition, { timestamps: true });
//saving the id key with object id
roomNumberSchema.pre("save", function () {
  this.id = this._id;
});

const roomNumberModel = mongoose.model("roomNumbers", roomNumberSchema);

module.exports = { roomNumberModel };
