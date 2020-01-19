const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('Cors')

const app = express();

mongoose.connect('mongodb+srv://mestre:pOrrA123@cluster0-wflbp.mongodb.net/firstApp?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json());
app.use(routes);

app.listen(3333);

//parametro:
//query params:  req.query(Filtros, ordenacao, paginacao ...) 
//route params (PUT, DELETE): req.params (identificar um recurso na alteração ou remoçao)
//body (POST, PUT):  req.body (Dados para criação ou alteração de um registro)