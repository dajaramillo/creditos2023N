const path = require('path');
const router = require('express').Router();
const User = require('../models/User');


router.get('/usuarios', (req, res)=> {
  //res.send('Estos son los datos');
  res.render('users/dato');
});


module.exports = router;
