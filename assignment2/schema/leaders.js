const mongoose = require("mongoose");

const schema  = mongoose.Schema;

const leadersSchema = new schema({

    name: {
        type: String,
        required: true, 
        unique: true
    }, 
    image:{
        type: String, 
        required: true
    },
    designation:{
        type: String, 
        required: true
    },
    abbr:{
        type: String, 
        required: true
    },
    featured:{
        type: Boolean, 
        default: false
    }, 
    description:{
        type: String, 
        required: true,
    }

}, {
    timestamps: true
});

const leaders = mongoose.model("leader", leadersSchema);

module.exports = leaders;