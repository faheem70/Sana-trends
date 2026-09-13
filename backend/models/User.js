const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },
    phone: { type: String, unique: true, sparse: true, trim: true },
    firebaseUid: { type: String, unique: true, sparse: true, index: true },
    passwordHash: { type: String },
    address: { type: String, trim: true, default: "" },
    town: { type: String, default: "Phoolpur", immutable: true },
    city: { type: String, default: "Azamgarh", immutable: true },
    state: { type: String, trim: true, default: "" },
    pincode: { type: String, trim: true, default: "" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
