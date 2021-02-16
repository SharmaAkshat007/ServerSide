const mongoose = require("mongoose");
require('mongoose-currency').loadType(mongoose);

const currency = mongoose.Types.Currency;
const schema = mongoose.Schema;

const comment = new schema({

    rating:{
        type: Number, 
        min: 1, 
        max: 5, 
        required: true
    }, 
    comment:{
        type: String, 
        required: true
    }, 
    author:{
        type: String, 
        required: true
    }
}, {
    timestamps: true
});

const dishesSchema = new schema({

    name :{
        type: String, 
        required: true, 
        unique: true
    }, 
    image:{
        type: String, 
        required: true, 
    }, 
    category:{
        type: String, 
        required: true
    }, 
    label:{
        type: String, 
        default: ""
    }, 
    price:{
        type: currency, 
        required: true, 
        min: 0
    }, 

    featured:{
        type: Boolean, 
        default: false
    }, 
    description:{
        type:String, 
        required: true
    }, 
    comments : [comment]

}, {
    timestamps: true
});

const dishes = mongoose.model("dish", dishesSchema);

module.exports = dishes;