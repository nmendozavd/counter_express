var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.use(session({secret: 'codingdojorocks'}));


app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  if (('count'in req.session) == false){
        req.session['count'] = 0;
      }
      console.log(req.session.count)
 res.render("index", {counter:req.session.count});
})

app.post('/', function(req, res){
  req.session.name = req.body.name;
  console.log(req.session.name);
  if (!('count'in req.session)){
        req.session['count'] = 0;
      }
    else{
        req.session['count'] += 1;
      }
      console.log(req.session.count)
  res.redirect('/');
})

app.post('/increment', function(req, res){
  req.session.name = req.body.name;
  console.log(req.session.name);
  req.session['count'] += 2;
  res.redirect('/');
})

app.post('/clear', function(req, res){
  req.session.name = req.body.name;
  console.log(req.session.name);
  delete req.session.count
  res.redirect('/');
})


app.listen(8000, function() {
 console.log("listening on port 8000");
});
