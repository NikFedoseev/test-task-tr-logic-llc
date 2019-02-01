const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    country: { type: String },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    createdDate: { type: Date, default: new Date() } //разобраться с датой
});

schema.set('toJSON', { virtuals: true }); //lern

module.exports = mongoose.model('User', schema);