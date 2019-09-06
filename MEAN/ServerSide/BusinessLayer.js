// Import Library
var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var bodyParser = require("body-parser");

// Database Connection String
var url = "mongodb://127.0.0.1:27017";

// Configure Middleware
var app = express();

// Configure CORS [optional]
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","GET","POST","PUT");
    next();
  });

app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());

//Create API Requests
app.get("/getUser", function(req, res){
     mongoClient.connect(url, function(err, db){
         if(!err){
             var dbo = db.db("meandb");
             dbo.collection("tblusers").find({}).toArray(function(err, documents){
                if(!err) {
                    res.send(documents);
                }
             })
         }
     })
})
app.post("/registerUser", function(req, res){
  mongoClient.connect(url, function(err,db){
    if(!err) {
        var dbo=db.db("meandb");
        dbo.collection("tblusers").insertOne({UserName:req.body.UserName, Password:req.body.Password, Email:req.body.Email, Mobile:req.body.Mobile}, function(err, result){
            if(!err) {
                console.log("Registered Successfully..");
            } else {
                console.log(err);
            }
        })
    }
  })
})
app.listen(8080);
console.log("Server Started...");