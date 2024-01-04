const express = require('express')
const User = require("../models/User");


module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
  getProfile: async (req, res) => {
    try {
      const user = await User.find({ user: req.user.id });
      res.render("profile.ejs", { user: req.user });
    } catch (err) {
      console.log(err);
    }
  }
};
