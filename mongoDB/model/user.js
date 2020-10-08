var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
const UserSchema = new Schema({
    name: { type: String },
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: { type: String, required: true },
    active: { type: Boolean }
});

module.exports = mongoose.model('User', UserSchema);