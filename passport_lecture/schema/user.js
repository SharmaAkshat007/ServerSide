const mongoose = require("mongoose");
const schema = mongoose.Schema;
const  passportLocalMongoose = require("passport-local-mongoose");

const user = new schema({
    admin:{
        type: Boolean,
        default: false
    }
});

user.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", user);