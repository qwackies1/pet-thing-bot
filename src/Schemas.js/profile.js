const mongoose = require('mongoose');

let profileSchema = new mongoose.Schema({
    userID: {
        type: mongoose.SchemaTypes.String,
        required: true
    },

    coins: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },

    job: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },

    inventory: {
        type: mongoose.SchemaTypes.Array,
        required: true,
    },

    pet: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },

    hourly_beg: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },

    daily_work:{
        type: mongoose.SchemaTypes.Number,
        required: true,
    }
})

module.exports = mongoose.model('profileSchema', profileSchema);