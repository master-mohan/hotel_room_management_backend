const mongoose = require("mongoose");

const definition = {
  id: {
    type: String,
    unique: true,
  },
  roomtypeId: {
    type: mongoose.Schema.ObjectId,
    ref: "roomType",
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  numberOfGuest: {
    type: Number,
    required: true,
  },
  numberOfRooms: {
    type: Number,
    required: true,
  },
  roomNumberId: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "roomNumbers",
      validate: {
        validator: function (v) {
          return mongoose.Types.ObjectId.isValid(v);
        },
        message: (props) => `${props.value} is not a valid room number ID!`,
      },
    },
  ],
  totalNight: {
    type: Number,
    default: 0,
  },
  actualPrice: {
    type: Number,
    required: true,
  },
  subTotal: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  paymetMethod: {
    type: String,
    default: null,
  },
  transactionId: {
    type: String,
    default: null,
  },
  paymentStatus: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email address is required"],
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number address!`,
    },
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: {
      values: ["confirmed", "cancelled", "pending"],
      message: "{VALUE} is not a valid status",
    },
    default: "pending",
  },
};

const bookingsSchema = mongoose.Schema(definition, { timestamp: true });

bookingsSchema.pre("save", function () {
  this.id = this._id;
});

const bookingsModel = mongoose.model("bookings", bookingsSchema);

module.exports = { bookingsModel };
