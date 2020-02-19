const express = require("express");
const { MongoClient, ObjectID } = require("mongodb");
const assert =require('assert')

const app = express();

app.use(express.json())

//syntax de mongodb driver
const mongo_url = "mongodb://localhost:27017";
const dataBase = "contactList";
MongoClient.connect(mongo_url, (err, client) => {
  assert.equal(err, null, "Database connection failed");
  const db = client.db(dataBase);
 
  app.post('/addition',(req,res)=>{
        db.collection('Contact').insert({...req.body},(err)=>{
            if (err) console.log('please try again')
            else res.send(req.body)
       
        })
  })

app.get('/affichage',(req,res)=>{
    db.collection('Contact').find().toArray((err,data)=>
    {    if (err) console.log('please try again')
    else res.send(data)
})

app.delete('/suppression/:id',(req,res)=>{
    let id=ObjectID(req.params.id)
    db.collection('Contact').findOneAndDelete({ _id : id }, (err, data) => {
        if (err) console.log(err);
        else res.send(" deleted")
      })
})
app.put('/update/:id', (req, res) => {
    let id = ObjectID(req.params.id);
    let updatedContact = req.body;
    db.collection("Contact").findOneAndUpdate(
      { _id: id },
      { $set: { ...updatedContact } },
      (err, data) => {
        if (err) console.log(err);
        else res.send("Contact updated");
      }
    );
  });
   


})



});



app.listen(5000, err => {
  if (err) console.log("server is not running");
  else console.log("server is running on port 5000");
  
});
