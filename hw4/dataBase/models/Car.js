const { Schema, model } = require('mongoose');

const carScheme = new Schema({
    producer: { type: String },
    model: { type: String },
    year: { type: Number },
    price: { type: Number },
    color: { type: String }
});

module.exports = model('Car', carScheme);
