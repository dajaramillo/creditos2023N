const path = require('path');
const router = require('express').Router();
const User = require('../models/User');


router.get('/usuarios', async (req, res)=> {
  //res.send('Estos son los datos');
    const datos = await User.find();
    res.render('users/dato', { datos });
});


module.exports = router;
