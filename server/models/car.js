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
        minlength: 1,
        trim: true
    },
    free:{
        type: Boolean,
        required: true
    },
    fuel:{
        type: Number,
        required: true
    },
    kilometers:{
        type: Number,
        required: true
    },
    location: {
        type: String,
        minlength: 1,
        required: true
    },
    position: {
        type: Number,
        required: true 
    }
});

module.exports = { Car };
