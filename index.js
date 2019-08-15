const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const MONGO_URL = 'mongodb://localhost';
mongoose.connect(`${MONGO_URL}/push`, { useNewUrlParser: true, autoIndex: false });
const models = require('./src/models.js')(mongoose);
const Worker = require('./src/worker.js')(models);

const PORT = 9000;
const app = express();

app.use(bodyParser.json());

app.get('/worker', function(req, res) {
  Worker.fetchById(req.query.id)
   .then(function(worker) {
     return res.send({
       status: 'success',
       data: {
         worker
       }
     })
   })
   .catch(function(err) {
     return res.status(400).send({
       status: 'error',
       msg: err.message
     })
   })
})

app.get('/worker/:state', function(req, res) {
  Worker.fetch(req.params.state)
   .then(function(workers) {
     return res.send({
       status: 'success',
       data: {
         workers
       }
     })
   })
   .catch(function(err) {
     return res.status(400).send({
       status: 'error',
       msg: err.message
     })
   })
})

app.post('/worker', function(req, res) {
  const msg = req.body['msg']
  worker = Worker.create(msg);

  res.send({
    status: 'success',
    data: {
      worker
    }
  })
})

app.put('/worker', function(req, res) {
  Worker.update(req.body['id'], req.body['state'])
    .then(function(worker) {
      return res.send({
        status: 'success',
        data: {
          worker
        }
      })
    })
    .catch(function(err) {
      return res.status(400).send({
        status: 'error',
        msg: err.message
      })
    })
})


app.listen(PORT, function() {
  console.log(`push notification server listening on port :${PORT}`)
})