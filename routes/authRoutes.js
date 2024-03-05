// const express = require("express")
// const router = express.Router()

const router = require("express").Router()
const controllers = require("../controllers/authControllers")

const verifyToken = require("../middlewares/verifyToken")

//test routing
router.get("/hello", (req, res) => {
  res.send("Hello Auth")
})


// register
// method: post
// path: http://localhost:5000/api/auth/register
router.post("/register", controllers.registerUser)

// login
// method: post
// path: http://localhost:5000/api/auth/login
router.post("/login", controllers.loginUser)

// private route
// method: get
// path: http://localhost:5000/api/auth/user
router.get("/user", verifyToken, controllers.getAuthUser)

module.exports = router