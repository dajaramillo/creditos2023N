const path = require('path');
const router = require('express').Router();

//Agregamos una ruta
router.get('/', (req, res)=> {
  res.render('index');
});

//Ruta del acerca
router.get('/about', (req, res)=> {
  res.render('about');
});

//otra ruta
router.get('/login', (req, res)=> {
  res.send('Formulario de inicio de sesión');
  //res.sendFile(path.join(__dirname+'/prueba.html'));
});

router.get('/objeto/:id', (req, res)=> {
    const id = req.params;
    console.log(id);
    res.json([
      {
        id,
        nombre: "Daniel",
        apellido: "Jaramillo"
      },
      { id,
        nombre: "Jorge",
        apellido: "Erazo"
      }
    ]);
});


module.exports = router;
