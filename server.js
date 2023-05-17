//console.log('Hola Server3');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars'); //motor de plantillas
const methodOverride = require('method-override');
const session = require('express-session');
const { dirname } = require('path');
const flash = require('connect-flash');
const passport = require('passport');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

//Inicializaciones
const app = express();
require('./database');

//Static files Ruta de documentos estáticos
app.use(express.static(path.join(__dirname, 'public')));



//configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views')); //asignamos la carpeta views dentro de src
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main', //propiedades de handlerbars //crear carpeta views/layouts/main.hbs
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'), //partes como formulario
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    extname: '.hbs' //extensión de los archivos
}));
app.set('view engine', '.hbs'); //motor de vistas en hbs

app.use(express.urlencoded({extended: false})); //estraer datos de la url
app.use(methodOverride('_method')); //metodos de petición



// Routes
app.use(require('./routes/index'));


//escuchamos puerto
app.listen(app.get('port'), ()=> {
  console.log('App en puerto 3000');
});
