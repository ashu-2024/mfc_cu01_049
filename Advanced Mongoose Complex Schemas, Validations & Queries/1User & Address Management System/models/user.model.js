const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  age: { type: Number },
  addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }]
});

module.exports = mongoose.model('User', userSchema);
