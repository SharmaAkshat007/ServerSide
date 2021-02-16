const mongoose = require("mongoose");
require('mongoose-currency').loadType(mongoose);

const currency = mongoose.Types.Currency;

const schema = mongoose.Schema;

const promotionsSchema = new schema({
    name:{
        type: String, 
        required: true, 
        unique: true
    }, 
    image:{
        type: String,
        required: true
    }, 
    label:{
        type: String,
        default: ''
    }, 
    price:{
        type: currency,
        required: true, 
        min: 0
    }, 
    featured:{
        type: Boolean, 
        default: false, 
       
    }, 
    description:{
        type: String, 
        required: true
    }

}, {
    timestamps: true
});

const promotions = mongoose.model("promotion", promotionsSchema);

module.exports = promotions;