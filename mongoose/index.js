const mongoose = require("mongoose");

const Dishes = require("./models/dishes.js");
const url = "mongodb://localhost:27017/first";

const connect = mongoose.connect(url);

connect.then((result)=>{

    console.log("Server connected properly");

    var newDish = Dishes({
        name : "mutter panner", 
        description: "fav dish"
    });

    newDish.save().then((result)=>{
        console.log(result);
        return Dishes.findByIdAndUpdate(newDish._id, {$set: {
            description: "updated"
        }}, {new: true}).exec();
    })
    .then((result)=>{
        console.log(result);
       newDish.comments.push({
            rating : 5,
            reaction: "loved it", 
            author: "akshat sharma"
        });

        return newDish.save();
    })
    .then((result)=>{
        console.log(result);
        return Dishes.remove();
    })
    .then((result)=>{
        mongoose.connection.close();
    })
    .catch((err)=>{
        console.log(err);
    });
});