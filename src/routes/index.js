const express = require('express');
const models = require('../models');

const router = express.Router();

router.get('/', (req, res) => {
  models.Users.findAll({
    include: [models.Tasks],
  }).then((users) => {
    res.render('index', {
      users,
    });
  });
});

module.exports = router;
