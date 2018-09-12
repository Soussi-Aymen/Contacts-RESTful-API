const express = require("express");
const mongodb = require("mongodb");
const bodyParser = require("body-parser");
const assert = require("assert");

const app = express();

app.use(bodyParser.json());

/*const mongo_url="mongodb://localhost:27017"
const database="contactdb"

mongodb.MongoClient(mongo_url, (err,client)=>{
	assert.equal(err,null,"Data Base connection is failed")
	const db=client.db(database)

})*/

var tab = [
  {
    name: "Aymen-Soussi",
    telephone: 27754900,
    email: "aymensoussi.02@gmail.com"
  },
  {
    name: "Mouhamed-Bousoffara",
    telephone: 58974635,
    email: "medbousoffara.@gmail.com"
  },
  {
    name: "Salma-kacem",
    telephone: 95698745,
    email: "salmakacem.@gmail.com"
  }
];

app.get("/contacts", (req, res) => {
  res.send(tab);
});

app.get("/contacts/:name", (req, res) => {
  let contactName = req.params.name;
  let contactToFetch = tab.filter(el => el.name === contactName);
  res.send(contactToFetch);
});

app.post("/add_contact", (req, res) => {
  let newcontact = req.body;
  tab.push(newcontact);
  res.send(tab);
  console.log("new val added, ", tab);
});

app.put("/modify_contact", (req, res) => {
  let modifycontact = req.body;
  tab = tab.map(el => (el.name === modifycontact.name ? modifycontact : el));
  res.send(tab);
});

app.delete("/delete_contact/:name", (req, res) => {
  deletecontact = req.params.name;
  tab = tab.filter(el => el.name !== deletecontact);
  res.send(tab);
});

const port = process.env.PORT || 5000;
app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log("server is runing on port ", port);
  }
});
