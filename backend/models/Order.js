const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    name: String,
    price: Number,
    qty: Number,
    size: String,
    image: String,
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    orderNumber: { type: String, required: true, unique: true },
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, default: "" },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    items: { type: [orderItemSchema], required: true },
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, default: "COD" },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
