const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    email: { type: String, trim: true },
    password: { type: String },
    number: { type: String },
    favourites: [{ type: String, trim: false }],
}, { timestamps: true });

const Users = model('User', userSchema);
module.exports = Users;

