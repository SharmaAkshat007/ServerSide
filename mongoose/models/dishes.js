const mongoose = require("mongoose");
const schema = mongoose.Schema;

const comment = new schema({

    rating : {
        type: Number,
        min: 1,
        max: 5,
        required: true
    }, 

    reaction : {
        type : String, 
        required: true
    }, 
    author: {
        type: String, 
        required: true
    }
}, {
    timestamps: true
});

const dishesSchema = new schema({ 
    
    name : {
    type : String, 
    required: true,
    unique: true 
}, 
description:{
    type: String,
    required: true
}, 
comments : [comment]
}, 
{
timestamps: true
});



const dishes = mongoose.model("dish", dishesSchema);

module.exports = dishes;