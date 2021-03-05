const { Schema, model } = require('mongoose');

const carScheme = new Schema({
    producer: { type: String },
    model: { type: String },
    year: { type: Number },
    price: { type: Number },
    color: { type: String },
    owner: { type: Schema.Types.ObjectId }
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

carScheme.virtual('carOwner', {
    ref: 'User',
    localField: 'owner',
    foreignField: '_id'
});

carScheme.pre('find', function() {
    this.populate('carOwner');
});

carScheme.pre('findOne', function() {
    this.populate('carOwner');
});

module.exports = model('Car', carScheme);
