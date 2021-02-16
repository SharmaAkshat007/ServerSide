const assert = require("assert");


module.exports.insertDocument = (db , document, collection, callback)=>{

    const collec = db.collection(collection);
    collec.insertOne(document, (err, result)=>{

        assert.equal(err, null);

        console.log("one document is added to collection ", collection);

        callback(result);
    });

};

module.exports.deleteDocument = (db , document, collection, callback)=>{

    const collec = db.collection(collection);
    collec.deleteOne(document, (err, result)=>{
        assert.equal(err, null);
        console.log("The document is deleted");
        callback(result);
    });
    
};

module.exports.findDocuments = (db , collection, callback)=>{

    const collec = db.collection(collection);

    collec.find({}).toArray((err, result)=>{
        assert.equal(err, null);
        callback(result);
    });
    
};

module.exports.updateDocument = (db , document, update, collection, callback)=>{

    const collec = db.collection(collection);
    
    collec.updateOne(document, {$set: update}, null,(err, result)=>{
        assert.equal(err, null);
        console.log("the required field of document is deleted");
        callback(result);
    });
};