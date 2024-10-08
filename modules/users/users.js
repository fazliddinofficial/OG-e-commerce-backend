const { model, Schema } = require('mongoose');

const users = new Schema({
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    email: { type: String, trim: true },
    password: { type: String },
    number: { type: String },
    favourites: [{ type: String, trim: false }],
}, { timestamps: true });

const usersSchema = model('User', users);
module.exports = usersSchema;

 