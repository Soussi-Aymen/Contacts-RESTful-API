const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//eq (equal)
//ne (not equal)
//gt (greater than)
//gte (greater than or equal to)
//lt (less than)
//lte (less than or equal to )
//in
//nin (not in)
const contactSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  telephone: {
    type: Number,
    required: true,
    maxlength: 8
  },
  email: {
    type: String,
    required: true
  },
  isAdded: {
    type: Boolean,
    default: true
  }
});

module.exports = Contact = mongoose.model("contact", contactSchema);
