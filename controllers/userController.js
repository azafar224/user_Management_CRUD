// controllers/userController.js
const User = require("../models/User");

// Create User
exports.createUser = async (req, res) => {
  console.log("in create user");
  try {
    const user = new User(req.body);
    await user.save();

    // Set a cookie with the user's name
    res.cookie("username", user.name, {
      httpOnly: true, // Accessible only by the web server
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      signed: true,
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Users
exports.getUsers = async (req, res) => {
  console.log("in get users");
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
