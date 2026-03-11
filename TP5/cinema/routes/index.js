var express = require('express');
var router = express.Router();
var axios = require('axios');

var API = 'http://localhost:3000';

router.get('/', function(req, res, next) {
  res.redirect('/filmes');
});

router.get('/filmes', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  axios.get(API + '/filmes?_sort=year')
    .then(resp => res.render('filmes_index', { list: resp.data, date: d }))
    .catch(next);
});

router.get('/filmes/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  axios.get(API + '/filmes/' + req.params.id)
    .then(resp => res.render('filme', { filme: resp.data, date: d }))
    .catch(next);
});

router.get('/atores', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  axios.get(API + '/atores?_sort=nome')
    .then(resp => res.render('atores_index', { list: resp.data, date: d }))
    .catch(next);
});

router.get('/atores/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  axios.get(API + '/atores/' + req.params.id)
    .then(resp => res.render('ator', { ator: resp.data, date: d }))
    .catch(next);
});

router.get('/generos', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  axios.get(API + '/generos?_sort=nome')
    .then(resp => res.render('generos_index', { list: resp.data, date: d }))
    .catch(next);
});

router.get('/generos/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  axios.get(API + '/generos/' + req.params.id)
    .then(resp => res.render('genero', { genero: resp.data, date: d }))
    .catch(next);
});

module.exports = router;