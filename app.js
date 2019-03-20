var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

//template engine
app.set('view engine', 'ejs');
//static files
app.use('/assets', express.static('assets'));
//fire controllers
todoController(app);

//port listener
app.listen(3000);
console.log('...listening to port 3000')
