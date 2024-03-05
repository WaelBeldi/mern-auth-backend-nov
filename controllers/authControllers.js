const mongoose = require("mongoose")
const User = require("../models/userModel")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
require("dotenv").config({path: "../config/.env"})

// register user
exports.registerUser = async (req, res) => {
  const {name, lastName, email, password} = req.body
  try {
    // simple validation
    // check fields
    if (!name || !lastName || !email || !password) {
      return res.status(400).send({msg: "Please enter all fields"})
    }
    // check if user already exists
    let user = await User.findOne({email})
    if (user) {
      return res.status(400).send({msg: "User already exists"})
    }
    // create new user
    user = new User({name, lastName, email, password})
    // hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    user.password = hashedPassword
    // save user
    await user.save()

    res.status(201).send({msg: "User registered", user})
  } catch (error) {
    res.status(500).send({msg: "Register server error"})
    console.log(error);
  }
}

// login user
exports.loginUser = async (req, res) => {
  const {email, password} = req.body
  try {
    // simple validation
    // check fields
    if (!email || !password) {
      return res.status(400).send({msg: "Please enter all fields"})
    }
    // check email
    let user = await User.findOne({email})
    if (!user) {
      return res.status(400).send({msg: "Bad credentials"})
    }
    // check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).send({msg: "Bad credentials"})
    }
    // sign user
    const payload = {id: user._id, name: user.name}
    const token = jwt.sign(payload, process.env.secretOrPrivateKey, {expiresIn: 60*60})

    res.status(200).send({msg: "User logged in", user, token})
  } catch (error) {
    res.status(500).send({msg: "Login server error"})
    console.log(error);
  }
}

// get auth user
exports.getAuthUser = (req, res) => {
  res.status(200).send({user: req.user})
}