const Contact = require("../models/contactModel")

// post contact
exports.postContact = async (req, res) => {
  try {
    //create a new contact with the model Contact
    const newContact = new Contact(req.body)
    //check name
    if (!req.body.name) {
      res.status(400).send({ message: "Name is required" })
    }
    //check email
    if (!req.body.email) {
      res.status(400).send({ message: "Email is required" })
    }
    //check if contact exists
    const existingContact = await Contact.findOne({ email: req.body.email })
    if (existingContact) {
      res.status(400).send({ message: "Contact already exists" })
    }

    //save contact
    newContact.save()

    res.status(201).send({ message: "Contact created", contact: newContact })
  } catch (error) {
    res.status(500).send({ message: "Server error" })
    console.log(error);
  }
}

// get all contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
    res.status(200).send({ message: "Getting all contacts", response: contacts })
  } catch (error) {
    res.status(500).send({ message: "Server error" })
    console.log(error);
  }
}

// get one contact by id
exports.getOneContact = async (req, res) => {
  try {
    const contact = await Contact.findById({ _id: req.params.id })
    if (contact) {
      res.status(200).send({ message: "Getting one contact", response: contact })
    } else {
      res.status(404).send({ message: "There is no contact with this id" })
    }
  } catch (error) {
    res.status(500).send({ message: "Server error" })
    console.log(error);
  }
}

// delete one contact
exports.deleteContact = async (req, res) => {
  try {
    await Contact.deleteOne({ _id: req.params.id })
    res.status(200).send({ message: "Contact deleted" })
  } catch (error) {
    res.status(500).send({ message: "Server error" })
    console.log(error);
  }
}

// update one contact
exports.updateContact = async (req, res) => {
  try {
    const result = await Contact.findByIdAndUpdate({ _id: req.params.id }, {$set: {...req.body}})
    if (result) {
      const newResult = await Contact.findOne({_id: req.params.id})
      res.status(200).send({ message: "Contact updated", response: newResult })
    } else {
      res.status(404).send({ message: "There is no contact with this id" })
    }
  } catch (error) {
    res.status(500).send({ message: "Server error" })
    console.log(error);
  }
}