const mongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017";
const dbname = "first";

const dbOper = require("./dbQueries.js");

mongoClient.connect(url, (err, client) => {

    assert.equal(err, null);
    console.log("server connected successfully");

    const db = client.db(dbname);

    dbOper.insertDocument(db, { name: "akshat", description: "author" }, "dishes", (result) => {
        console.log(result.ops);

        dbOper.findDocuments(db, "dishes", (result) => {

            console.log(result);

            dbOper.updateDocument(db, { name: "akshat", description: "author" }, { description: "second" }, "dishes", (result) => {

                console.log(result.result);

                dbOper.findDocuments(db, "dishes", (result) => {

                    console.log(result);

                   db.dropCollection("dishes", (err, result)=>{
                       assert.equal(err, null);
                    console.log("deleted");

                    client.close();

                   });

                      
                    });
                });

            });
        });





});

