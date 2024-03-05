const express = require("express")
const router = express.Router()
const controllers = require("../controllers/contactControllers")

//test routing
router.get("/hello", (req, res) => {
  res.send("Hello contact routing")
})

// add contact
// method: post
// path: http://localhost:5000/api/contact/
router.post("/", controllers.postContact)

// get all contacts
// method: get
// path: http://localhost:5000/api/contact/
router.get("/", controllers.getAllContacts)

// get one contact by id
// method: get
// path: http://localhost:5000/api/contact/:id
router.get("/:id", controllers.getOneContact)

// delete one contact
// method: delete
// path: http://localhost:5000/api/contact/:id
router.delete("/:id", controllers.deleteContact)

// update one contact
// method: put
// path: http://localhost:5000/api/contact/:id
router.put("/:id", controllers.updateContact)

module.exports = router