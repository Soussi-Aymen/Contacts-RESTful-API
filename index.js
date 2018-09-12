const express = require("express");
const { MongoClient, ObjectID } = require("mongodb");
const bodyParser = require("body-parser");
const assert = require("assert");

const app = express();

app.use(bodyParser.json());

const mongo_url = "mongodb://localhost:27017";
const database = "contactdb";

// Use connect method to connect to the Server
MongoClient.connect(
  mongo_url,
  function(err, client) {
    assert.equal(null, err);

    console.log("Connected correctly to server");
    assert.equal(err, null, "Data Base connection is failed");
    const db = client.db(database);
    app.post("/add_contact", (req, res) => {
      let newcontact = req.body;
      db.collection("contacts").insertOne(newcontact, (err, data) => {
        if (err) {
          res.send(err);
        } else {
          res.send(data);
        }
      });
    });

    app.get("/contacts", (req, res) => {
      db.collection("contacts")
        .find()
        .toArray((err, data) => {
          if (err) {
            res.send("can not fectch contacts");
          } else {
            res.send(data);
          }
        });
    });

    app.get("/contact/:id", (req, res) => {
      let contactid = ObjectID(req.params.id);
      db.collection("contacts").findOne({ _id: contactid }, (err, data) => {
        if (err) {
          res.send("can not fetch contact");
        } else {
          res.send(data);
        }
      });
    });

    app.put("/modify_contact/:id", (req, res) => {
      let contactid = ObjectID(req.params.id);
      let modifycontact = req.body;
      db.collection("contacts").findOneAndUpdate(
        { _id: contactid },
        { $set: { ...modifycontact } },
        (err, data) => {
          if (err) {
            throw err;
          } else {
            res.send("contact was modified");
          }
        }
      );
    });

    app.delete("/delete_contact/:id", (req, res) => {
      let contactid = ObjectID(req.params.id);
      let modifycontact = req.body;
      db.collection("contacts").findOneAndDelete(
        { _id: contactid },
        (err, data) => {
          if (err) {
            res.send("can not delete contact");
          } else {
            res.send("contact was deleted");
          }
        }
      );
    });
  }
);

/*MongoClient(mongo_url, (err, client) => {  
});*/

const port = process.env.PORT || 5000;
app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log("server is runing on port ", port);
  }
});
