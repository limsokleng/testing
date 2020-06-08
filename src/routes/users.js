const express = require('express');
const models = require('../models');

const router = express.Router();

router.post('/create', (req, res) => {
  models.Users.create({
    username: req.body.username,
  }).then(() => {
    res.redirect('/');
  });
});

router.get('/:user_id/destroy', (req, res) => {
  models.Users.destroy({
    where: {
      id: req.params.user_id,
    },
  }).then(() => {
    res.redirect('/');
  });
});

router.post('/:user_id/tasks/create', (req, res) => {
  models.Tasks.create({
    title: req.body.title,
    UserId: req.params.user_id,
  }).then(() => {
    res.redirect('/');
  });
});

router.get('/:user_id/tasks/:task_id/destroy', (req, res) => {
  models.Tasks.destroy({
    where: {
      id: req.params.task_id,
    },
  }).then(() => {
    res.redirect('/');
  });
});


module.exports = router;
