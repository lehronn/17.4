var express = require("express");
var bodyParser = require("body-parser");

var fs = require('fs');
var app = express();
var stringifyFile;

app.use(bodyParser.json());

//serwowanie statycznych elemementów.
app.use(express.static('assets'));

app.get('/userform', function (req, res) {
  var response = {
    first_name: req.query.first_name,
    last_name: req.query.last_name
  };
  res.end(JSON.stringify(response));
});

app.post('/', function (req, res) {
  console.log('Otrzymałem żądanie POST do strony głównej.');
  res.sendFile('/index.html') //wysyła w odpowiedzi pliki zamiast tekstu.
});

//odpowiedź na to zapytanie wyświetli zawartość pliku
app.get('/getNote', function (req, res) {
  console.log('Otrzymałem żądanie GET do strony /getNote');
  fs.readFile('./test.json', 'utf8', function(err, data) {
    if (err) throw err;
    stringifyFile = data
    res.send(data);
});
});

//odpowiedź na to zapytanie zaktualizuje zawartość pliku
  app.post('/updateNote/:note', function (req, res) {
    console.log('Otrzymałem żądanie POST do strony /updateNote/' + req.params.note);
    
    stringifyFile = req.params.note;
    
    fs.writeFile('./test.json', stringifyFile, function(err) {
//      If (err) throw err;
      console.log('file updated');
    });
  });
  
  
//endpoint dynamiczny przekazujący ID podany w adresie
app.get('/:id', function(req, res) {
  res.send('Identyfikator, który został dopisany to ' + req.params.id);
});
//koniec endpointu dynamicznego.

app.delete('/del_user', function (req, res) {
  console.log('Otrzymałem żądanie DELETE do strony /del_user');
  res.send('Hello DELETE!');
});

app.get('/list_user', function (req, res) {
  console.log('Otrzymałem żądanie GET do strony /list_user');
  res.send('Strona z listą użytkowników!');
});

app.get('/ab*cd', function(req, res) {
  console.log('Otrzymałem żądanie GET do strony /ab*cd');
  res.send('Wzór pasuje');
});

app.use(function (req, res, next) {
    res.status(404).send('Wybacz, nie mogliśmy odnaleźć tego, czego żądasz!')
});

//nasłuchiwanie
var server = app.listen(3004, 'localhost', () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Przykładowa aplikacja nasłuchuje na adresie: http://' + host + ':' + port);
});

//obsługa błędu 404
app.use(function (req, res, next) {
    res.status(404).send('Wybacz, nie mogliśmy odnaleźć tego, czego szukasz!')
});
