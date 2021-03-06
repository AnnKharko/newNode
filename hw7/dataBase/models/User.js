const { Schema, model } = require('mongoose');

const userScheme = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    cars: [{
        type: Schema.Types.ObjectId
    }]
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

userScheme.virtual('userCars', {
    ref: 'Car',
    localField: 'cars',
    foreignField: '_id'
});

// userScheme.pre('find', function() {
//     this.populate('userCars');
// });
//
// userScheme.pre('findOne', function() {
//     this.populate('userCars');
// });

module.exports = model('User', userScheme);
