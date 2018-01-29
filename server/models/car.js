var mongoose = require('mongoose');

var Car = mongoose.model('Car', {
    registration:{
        type: String,
        required: true,
        minlength: 7,
        trim: true
    },
    model:{
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    category:{
        type: String,
        required: true,
        minlength: 1
    },
    fuel:{
        type: Number
    },
    kilometers:{
        type: Number
    },
    location: {
        type: String,
        minlength: 1
    },
    position: {
        type: Number,
        unique: true,
        required: true 
    }
});

module.exports = { Car };
