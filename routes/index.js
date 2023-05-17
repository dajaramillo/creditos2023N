const path = require('path');
const router = require('express').Router();
const User = require('../models/User');

//Agregamos una ruta
router.get('/', (req, res)=> {
  res.render('index');
});

//Ruta del acerca
router.get('/about', (req, res)=> {
  res.render('about');
});

//Ruta del inicio de sesión
router.get('/signin', (req, res)=> {
  res.render('users/signin');
});

//Ruta del registro
router.get('/signup', (req, res)=> {
  res.render('users/signup');
});

router.post('/signup', async (req, res)=> {
  //console.log(req.body);
  const { name, email, password, password2, identificacion } = req.body;
  const newUser = new User({name, email, password, identificacion});
  //newUser.password = await newUser.encryptPassword(password);
  //Consultamos email antes de guardar
  const emailUser = await User.findOne({email: email});
  console.log('Este es el nombre' + emailUser.name);
  //console.log(emailUser);
  //await newUser.save();
  res.render("users/signup");
});


module.exports = router;
