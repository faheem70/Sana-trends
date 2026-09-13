const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const User = require("../models/User");
const userAuth = require("../middleware/userAuth");
const getFirebaseAdmin = require("../config/firebaseAdmin");

const router = express.Router();

function customerToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, name: user.name, role: "customer" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
}

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
    town: "Phoolpur",
    city: "Azamgarh",
    state: user.state || "",
    pincode: user.pincode || "",
  };
}

// POST /api/auth/customer-phone-login -> exchange a Firebase phone token for the app session
router.post("/customer-phone-login", async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken)
      return res.status(400).json({ message: "Firebase token is required" });

    const decoded = await getFirebaseAdmin().auth().verifyIdToken(idToken);
    if (!decoded.phone_number) {
      return res
        .status(401)
        .json({ message: "A verified mobile number is required" });
    }

    let user = await User.findOne({ firebaseUid: decoded.uid });
    if (!user) {
      user = await User.findOne({ phone: decoded.phone_number });
    }
    if (!user) {
      user = await User.create({
        name: "Sana Trends customer",
        phone: decoded.phone_number,
        firebaseUid: decoded.uid,
        town: "Phoolpur",
        city: "Azamgarh",
      });
    } else {
      user.firebaseUid = decoded.uid;
      user.phone = decoded.phone_number;
      await user.save();
    }

    res.json({ token: customerToken(user), user: publicUser(user) });
  } catch (err) {
    if (err.message === "FIREBASE_SERVICE_ACCOUNT_JSON is not configured") {
      return res
        .status(503)
        .json({
          message: "Firebase authentication is not configured on the server",
        });
    }
    res.status(401).json({ message: "Unable to verify mobile number" });
  }
});

// POST /api/auth/register -> create a customer account
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser)
      return res
        .status(409)
        .json({ message: "An account with this email already exists" });

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash: await bcrypt.hash(password, 10),
    });

    res.status(201).json({
      token: customerToken(user),
      user: publicUser(user),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST /api/auth/customer-login -> customer login (kept separate from admin login)
router.post("/customer-login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      token: customerToken(user),
      user: publicUser(user),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /api/auth/profile -> current customer's saved profile
router.get("/profile", userAuth, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(publicUser(user));
});

// PATCH /api/auth/profile -> update editable profile fields
router.patch("/profile", userAuth, async (req, res) => {
  try {
    const allowed = ["name", "email", "address", "state", "pincode"];
    const updates = {};
    for (const field of allowed) {
      if (req.body[field] !== undefined)
        updates[field] = String(req.body[field]).trim();
    }
    if (updates.name === "")
      return res.status(400).json({ message: "Name is required" });
    if (updates.email) updates.email = updates.email.toLowerCase();

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { ...updates, town: "Phoolpur", city: "Azamgarh" },
      { new: true, runValidators: true },
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(publicUser(user));
  } catch (err) {
    if (err.code === 11000)
      return res.status(409).json({ message: "That email is already in use" });
    res
      .status(500)
      .json({ message: "Unable to update profile", error: err.message });
  }
});

// POST /api/auth/login  { username, password } -> { token, username }
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({ token, username: admin.username });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
