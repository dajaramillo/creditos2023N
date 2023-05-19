const path = require('path');
const router = require('express').Router();
const User = require('../models/User');
const passport = require('passport');

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

router.post('/signin', passport.authenticate('local', {
  successRedirect: '/usuarios',
  failureRedirect: '/signin',
  failureFlash: true
}));



//Ruta del registro
router.get('/signup', (req, res)=> {
  res.render('users/signup');
});

router.post('/signup', async (req, res)=> {
  const { name, email, password, password2, identificacion } = req.body;
  const errors = [];
  if(name.length <= 0){
    errors.push({text: 'Ingrese el nombre'})
  }
  if(password != password2){
    errors.push({text: 'Las contraseñas no coinciden'})
  }
  if(email.length <= 0){
    errors.push({text: 'Ingrese Email'})
  }
  if(password.length <= 3){
    errors.push({text: 'Ingrese más de 3 caracteres'})
  }

  if(errors.length > 0){
    res.render('users/signup', {errors, name, email, password, password2, identificacion});
  } else {
    //res.send('OK');
    const emailUser = await User.findOne({email: email});
    if(emailUser){
        req.flash('error_msg', 'El correo ya está registrado');
        res.redirect('/signup');


    } else {
    const newUser = new User({name, email, identificacion,password});
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    req.flash('success_msg', 'Usuario Registrado');
    res.redirect('/signin');
    }
  }
});


module.exports = router;
