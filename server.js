const express = require('express');
const app = express();
const pokemon = require('./models/pokemon.js');
const port = 3000;
const methodOverride = require("method-override");
const morgan = require("morgan");


// STATIC MIDDLEWARE
app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride("_method"));
app.use(morgan("dev"))

app.use((req, res, next) => {
  console.log("I run for all routes")
  next()
})

app.get('/', (req, res) => {
    res.redirect('/pokemon');
})


// INDEX
app.get('/pokemon', (req, res) => {
    res.render('index.ejs', { data: pokemon });
});

// NEW
app.get('/pokemon/new', (req, res) => {
    res.render('new.ejs');
});

// DELETE
app.delete('/pokemon/:id', (req, res) => {
    pokemon.splice(req.params.id, 1);
    res.redirect('/pokemon');
});

// UPDATE
app.put('/pokemon/:id', (req, res) => {
    pokemon[req.params.id] = req.body;
    res.redirect('/pokemon');
});

// CREATE
app.post('/pokemon', (req, res) => {
    console.log(req.body)
    pokemon.push(req.body)
    res.redirect('/pokemon')
});

// EDIT
app.get('/pokemon/:id/edit', (req, res) => {
    res.render('edit.ejs', {
        data: pokemon[req.params.id],
        index: req.params.id,
    });
})

// SHOW
app.get('/pokemon/:id', (req, res) => {
    res.render('show.ejs', { data: pokemon[req.params.id] });
});

app.listen(port, () => {
    console.log(`listening on port`, port)
});