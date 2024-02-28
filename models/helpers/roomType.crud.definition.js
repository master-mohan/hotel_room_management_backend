const mongoose = require("mongoose");

const definition = {
  id: {
    type: String,
    unique: true,
  },
  typeName: {
    type: String,
    unique: true,
    required: true,
  },
  totalAdult: {
    type: Number,
    default: null,
  },
  totalChild: {
    type: Number,
    default: null,
  },
  roomCapacity: {
    type: Number,
    default: null,
  },
  image: {
    type: String,
    default: null,
  },
  price: {
    type: Number,
    default: null,
  },
  size: {
    type: String,
    default: null,
  },
  view: {
    type: String,
    default: null,
  },
  bedStyle: {
    type: String,
    default: null,
  },
  discount: {
    type: Number,
    default: 0,
  },
  shortDesc: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
  facilitiesId: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "facilities",
      validate: {
        validator: function (v) {
          return mongoose.Types.ObjectId.isValid(v);
        },
        message: (props) => `${props.value} is not a valid facilities ID!`,
      },
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
};

const roomTypeSchema = mongoose.Schema(definition, { timestamps: true });

roomTypeSchema.pre("save", function () {
  this.id = this._id;
});

const roomTypeModel = mongoose.model("roomType", roomTypeSchema);

module.exports = { roomTypeModel };
