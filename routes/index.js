var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET hello world page. */
router.get('/helloworld', function(req, res) {
  console.log(req);
  res.render('helloworld', { title: 'Hello World' });
});

router.get('/userlist', function(req, res){
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{},function(e,docs){
    res.render('userlist',{
      "userlist":docs
    });
  });
});

router.get('/newuser', function(req, res){
  res.render('newuser',{
    "title":"Add New User"
  });
});

router.post('/adduser', function(req, res){

  //get handle to db instance from request
  var db = req.db;

  //fetch values from form inputs
  var userName = req.body.username;
  var userEmail = req.body.useremail;

  var collection = db.get('usercollection');

  collection.insert({
    "username": userName,
    "email": userEmail
  }, function(err,doc){
    if (err) {
      res.send('There was a problem adding the new record to the database.');
    } else {
      res.redirect("userlist");
    }
  });



});

router.get('/notelist', function(req, res){
  var db = req.db;
  var collection = db.get('notecollection');
  collection.find({},{},function(e,docs){
    res.render('notelist',{
      "notelist":docs
    });
  });
});

/*currently need to fix the passing of the query parameter
- how do you defines params for routes
- once defined, I think I'll have no probs retrieving it using req.params.<paramname> */

router.get('/viewnote', function(req, res){
  var db = req.db;
  var collection = db.get('notecollection');

  var noteid = req.params.id;
  console.log(noteid);
  collection.findOne({_id : { $eq : noteid}},{},function(e,docs){
    console.log(docs);
    res.render('viewnote',{
      "note":docs
    });
  });
});

router.get('/newnote', function(req, res){
  res.render('newnote',{
    "title":"Add New Note"
  });
});

router.post('/addnote', function(req, res){

  //get handle to db instance from request
  var db = req.db;

  //fetch values from form inputs
  var noteTitle = req.body.notetitle;
  var noteText = req.body.notetext;

  var collection = db.get('notecollection');

  collection.insert({
    "title": noteTitle,
    "text": noteText
  }, function(err,doc){
    if (err) {
      res.send('There was a problem adding the new record to the database.');
    } else {
      res.redirect("notelist");
    }
  });
});


module.exports = router;
