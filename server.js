const express = require("express")
const connectDB = require("./config/connectDB")
require("dotenv").config({path: "./config/.env"})
const contactRouter = require("./routes/contactRoutes")
const authRouter = require("./routes/authRoutes")

const app = express()

connectDB()

const PORT = process.env.PORT

app.use(express.json())

//routes
app.use("/api/contact", contactRouter)
app.use("/api/auth", authRouter)

app.listen(PORT, err => {
  err ? console.log(err)
      : console.log("Server running on port " + PORT);
})