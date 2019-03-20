var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//create server connection
mongoose.connect('mongodb+srv://seun_admin:test@cluster0-z1fwy.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });

//handle rejection
process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason.stack || reason)
    // Recommended: send the information to sentry.io
    // or whatever crash reporting service you use
  });﻿

//create schema
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);


var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

  app.get('/todo', function(req, res){
    //get data from database and add to view
    Todo.find({}, function(err, data){
      if(err) throw err;
      res.render('todo',{todos:data});
    });
  });

  app.post('/todo', urlencodedParser, function(req, res){
    //get data from view and add to mongodb
    var newTodo = Todo(req.body).save(function(err, data){
      if(err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', function(req, res){
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).deleteOne(function(err, data){
      if(err) throw err;
      res.json(data);
    });
  });

};
