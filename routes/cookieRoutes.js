// routes/cookieRoutes.js
const express = require("express");
const router = express.Router();

// Route to set a cookie
router.post("/set", (req, res) => {
  const { name, value, options } = req.body;

  if (!name || !value) {
    return res
      .status(400)
      .json({ error: "Name and value are required to set a cookie." });
  }

  // Set cookie with options if provided
  res.cookie(name, value, options || {});
  res.status(200).json({ message: `Cookie '${name}' set successfully.` });
});

// Route to get all cookies
router.get("/get", (req, res) => {
  res.status(200).json({ cookies: req.cookies });
});

// Route to clear a specific cookie
router.post("/clear", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ error: "Name is required to clear a cookie." });
  }

  res.clearCookie(name);
  res.status(200).json({ message: `Cookie '${name}' cleared successfully.` });
});

module.exports = router;
