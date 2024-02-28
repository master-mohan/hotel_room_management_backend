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
  bookedDate: {
    type: Date,
    required: true,
  },
};

const roomBookedDatesSchema = mongoose.Schema(definition, { timestamps: true });

roomBookedDatesSchema.pre("save", function () {
  this.id = this._id;
});

const roomBookedDatesModel = mongoose.model(
  "roomBookedDates",
  roomBookedDatesSchema
);

module.exports = { roomBookedDatesModel };
