// backend/models/Component.js
const mongoose = require('mongoose');

const componentSchema = new mongoose.Schema({
  name: String,
  price: String,
  availability: String,
  link: String
});

const Component = mongoose.model('Component', componentSchema);

module.exports = Component;