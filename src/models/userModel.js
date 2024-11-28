const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
},
{
    collection: 'users'
});

const User = mongoose.model("User", userSchema);



module.exports = { User };


// USER admin

//  "email": "admin@admin.com",
//   "password": "Admin123"