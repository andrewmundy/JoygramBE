var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {

/******** GET ********
**********************/
app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  const details = { '_id': new ObjectID(id) };
  db.collection('users').findOne(details, (err, item) => {
    if (err) {
      res.send({'error':'An error has occurred'});
    } else {
      res.send(item);
    }
  });
});

app.get('/photos/:id', (req, res) => {
  const id = req.params.id;
  const details = { '_id': new ObjectID(id) };
  db.collection('photos').findOne(details, (err, item) => {
    if (err) {
      res.send({'error':'An error has occurred'});
    } else {
      res.send(item);
    }
  });
});

/******** POST ********
**********************/
app.post('/photos', (req, res) => {
  const photo = { url: req.body.url, description: req.body.description, posted_by: req.body.posted_by };

  db.collection('photos').insert(photo, (err, result)=> {
    if (err) {
      res.send({ 'error': 'An error has occurred' });
    } else {
      res.send(result.ops[0]);
    }
  });
});

app.post('/users', (req, res) => {
    const user = { username: req.body.username, avatar: req.body.avatar, description: req.body.description };

    db.collection('users').insert(user, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

/******** DELETE ********
**********************/
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('users').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('user ' + id + ' deleted!');
      }
    });
  });

app.delete('/photos/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('photos').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('photo ' + id + ' deleted!');
      }
    });
  });

/******** PUT ********
**********************/
app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const details = { '_id': new ObjectID(id) };
  const user = { text: req.body.username, title: req.body.description };
  db.collection('users').update(details, user, (err, result) => {
    if (err) {
        res.send({'error':'An error has occurred'});
    } else {
        res.send(user);
    }
  });
});

app.put('/photos/:id', (req, res) => {
  const id = req.params.id;
  const details = { '_id': new ObjectID(id) };
  const user = { text: req.body.username, title: req.body.description };
  db.collection('photos').update(details, user, (err, result) => {
    if (err) {
        res.send({'error':'An error has occurred'});
    } else {
        res.send(user);
    }
  });
});

};
