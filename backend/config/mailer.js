const nodemailer = require("nodemailer");

const ADMIN_EMAIL = "faheemkh9670@gmail.com";

function createTransporter() {
  const host = process.env.MAIL_HOST;
  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_PASSWORD;

  if (!host || !user || !pass) {
    return null;
  }

  const port = Number(process.env.MAIL_PORT || 587);
  return nodemailer.createTransport({
    host,
    port,
    secure: process.env.MAIL_SECURE === "true" || port === 465,
    auth: { user, pass },
  });
}

async function notifyAdminOfOrder(order) {
  const transporter = createTransporter();
  if (!transporter) {
    console.warn(
      "Order email not sent: MAIL_HOST, MAIL_USER, and MAIL_PASSWORD are required",
    );
    return;
  }

  const itemLines = order.items
    .map(
      (item) =>
        `- ${item.name} | Size: ${item.size || "-"} | Qty: ${item.qty} | Rs. ${item.price * item.qty}`,
    )
    .join("\n");

  await transporter.sendMail({
    from: process.env.MAIL_FROM || process.env.MAIL_USER,
    to: ADMIN_EMAIL,
    subject: `New order ${order.orderNumber}`,
    text: [
      "A new order has been placed on Sana Trends.",
      "",
      `Order number: ${order.orderNumber}`,
      `Customer: ${order.customer.name}`,
      `Phone: ${order.customer.phone}`,
      `Email: ${order.customer.email || "-"}`,
      `Address: ${order.customer.address}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}`,
      "",
      "Items:",
      itemLines,
      "",
      `Total: Rs. ${order.totalAmount}`,
      `Payment: ${order.paymentMethod}`,
    ].join("\n"),
  });
}

module.exports = { notifyAdminOfOrder };
