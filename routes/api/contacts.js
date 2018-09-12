const express = require("express");
const router = express.Router();

//Contact Model
const Contact = require("../../models/Contact");

//REST API

router.get("/contacts", (req, res) => {
  Contact.find().then(contacts => res.json(contacts));
});

router.get("/contact/:id", (req, res) => {
  Contact.findById(req.params.id).then(contact => res.json(contact));
});

router.post("/add_contact", (req, res) => {
  const newContact = new Contact({ ...req.body });
  newContact.save().then(contact => res.json(contact));
});

router.put("/modify_contact/:id", (req, res) => {
  contact = Contact.findById(req.params.id)
    .then(contact =>
      contact.update({ ...req.body }).then(res.json({ success: true }))
    )
    .catch(err => res.status(404).json({ success: false }));
});

router.delete("/delete_contact/:id", (req, res) => {
  contact = Contact.findById(req.params.id)
    .then(contact => contact.remove().then(res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
