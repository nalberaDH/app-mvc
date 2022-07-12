const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');

const path = require('path');


const routerMain = require('./routes/main');
const routerUser = require('./routes/users');

const app = express();

app.set('view engine','ejs');

app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'../public')));


app.use(routerMain);
app.use(routerUser);

app.use((req,res,next)=>{
    res.status.apply(400).render(__dirname,'./views/not-found');
})
app.listen(3001, () => console.log("Servidor escuchando en puerto 3001"));


