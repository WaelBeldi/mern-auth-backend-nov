const jwt = require("jsonwebtoken")
require("dotenv").config({path: "../config/.env"})
const User = require("../models/userModel")

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-auth-token"]
    //check for token
    if (!token) {
      return res.status(400).send({msg: "No token. Unauthorized!"})
    }
    //get user from payload
    const decoded = jwt.verify(token, process.env.secretOrPrivateKey)
    const user = await User.findById(decoded.id)
    //check user
    if (!user) {
      return res.status(400).send({msg: "Unauthorized!"})
    }
    // console.log(decoded);

    //get user
    req.user = user

    next()
  } catch (error) {
    res.status(500).send({msg: "Error while validating token"})
    console.log(error);
  }
}

module.exports = verifyToken