require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const path = require('path');
const publicPath = path.join(__dirname, '..', 'public');
var mongoose = require('./db/mongoose');
var {authenticate} = require('./middleware/authenticate');


var app = express();

const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));

app.use(express.static(publicPath));


// CAR
var { Car } = require('./models/car');

app.get('/cars', authenticate, (req, res, next) => {
    Car.find((e, cars) => {
    if (e) return res.status(400).send();
    res.json(cars);
  });
});

app.get('/cars/:id', authenticate, (req, res, next) => {
  Car.findById(req.params.id, (e, car) => {
    if (e) return res.status(404).send();
    res.json(car);
  });
});

app.post('/cars', authenticate, (req, res, next) => {
    var body = _.pick(req.body, ['registration','model','category','fuel','kilometers','location','position']);
    Car.create(body, (e, car) => {
        if (e) return res.status(400).send();
        res.json(car);
    });
});

app.put('/cars/:id', authenticate, (req, res, next) => {
    var body = _.pick(req.body, ['registration','model','category','fuel','kilometers','location','position']);
  Car.findOneAndUpdate(req.params.id, body, (e, car) => {
    if (e) return res.status(400).send();
        res.json(car);
  });
});

app.patch('/cars/:id', authenticate, (req, res)=>{
    var id = req.params.id;
    var body = _.pick(req.body, ['registration','model','category','fuel','kilometers','location','position']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Car.findOneAndUpdate({
        _id: id,
    }, {$set: body}, {new: true} ).then((car)=>{
        if(!car){
            return res.status(404).send();
        }
        res.send({car});
    }).catch((e)=>{
        res.status(400).send();
    });
});

app.delete('/cars/:id', authenticate, function(req, res, next) {
    Car.findByIdAndRemove(req.params.id, function (e, car) {
        if (e) return res.status(400).send();
        res.json(car);
    });
});

// USERS
var {User} = require('./models/user');

app.post('/users',(req, res)=>{
  var body = _.pick(req.body, ['email','password']);
  var user = new User(body);

  user.save().then((user)=>{
      return user.generateAuthToken();
  }).then((token)=>{
      res.header('x-auth',token).send(user);
  }).catch((e)=>{
      res.status(400).send(e);
  });
});


app.get('/users/me', authenticate, (req, res)=>{
  res.send(req.user);
});


app.post('/users/login',(req, res)=>{
  var body = _.pick(req.body, ['email','password']);

  User.findByCredentials(body.email,body.password).then((user)=>{
      return user.generateAuthToken().then((token)=>{
          res.header('x-auth',token).send(user);
      });
  }).catch((e)=>{
      res.status(400).send();
  });
});

// NEEDS WORK
app.delete('/users/me/token',authenticate, (req, res)=>{
  req.user.removeToken().then(()=>{
      res.status(200).send();
  },()=>{
      res.status(400).send();
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});


app.listen(port,()=>{
    console.log(`App started on port ${port}`);
});


module.exports = { app };
