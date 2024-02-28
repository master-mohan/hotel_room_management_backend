const mongoose = require("mongoose");

const definition = {
  id: {
    type: String,
    unique: true,
  },
  bookingId: {
    type: mongoose.Schema.ObjectId,
    ref: "bookings",
    required: true,
  },
  roomtypeId: {
    type: mongoose.Schema.ObjectId,
    ref: "roomType",
    required: true,
  },
  roomNumberId: {
    type: mongoose.Schema.ObjectId,
    ref: "roomNumbers",
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
};

const bookedRoomSchema = mongoose.Schema(definition, { timestamps: true });

bookedRoomSchema.pre("save", function () {
  this.id = this._id;
});

const bookedRoomModel = mongoose.model("bookedRoomList", bookedRoomSchema);

module.exports = { bookedRoomModel };
