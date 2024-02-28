const mongoose = require("mongoose");
const phoneUtil =
  require("google-libphonenumber").PhoneNumberUtil.getInstance();

const definition = {
  id: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email address is required"],
    unique: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  emailIsVerified: {
    type: Boolean,
    default: false,
  },
  emailVerifiedAt: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    default: null,
  },
  photo: {
    type: String,
    default: null,
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
  phoneIsVerified: {
    type: Boolean,
    default: false,
  },
  phoneVerifiedAt: {
    type: String,
    default: null,
  },
  address: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: {
      values: ["user", "admin", "employee"],
      message: "{VALUE} is not a valid role",
    },
    default: "user",
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  token: {
    type: String,
    default: null,
  },
  loggedSessions: [
    {
      type: String,
      default: null,
    },
  ],
  isDeleted: {
    type: Boolean,
    default: false,
  },
};

const userSchema = mongoose.Schema(definition, { timestamps: true });

userSchema.pre("save", function () {
  this.id = this._id;
});

const userModel = mongoose.model("users", userSchema);

module.exports = { userModel };
