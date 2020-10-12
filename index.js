const path = require('path');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const cookieParser = require('cookie-parser')
const session = require('express-session')

app.use(cookieParser())

app.use(session({
  secret: "cle"
}))
/*
app.get('/', function (req, res) {
  if (req.session.page_views >= 1) {
    req.session.page_views++
    res.send("you visited our web site " + req.session.page_views + " times")
  }
  else {
    req.session.page_views = 1
    res.send("welcome, first time!")
  }
})*/

//Create Connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'store'
});

//connect to database
conn.connect((err) => {
  if (err) throw err;
  console.log('Connecter au base de données ...');
});

//set views file
//le répertoire de stockage des templates.
app.set('views', path.join(__dirname, 'views'));
//set view engine
//Préciser le moteur de template à utiliser
app.set('view engine', 'hbs');
// Ce 'body-parser' module analyse les données codées JSON, tampon, chaîne et URL soumises à l'aide de la HTTP POST demande.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set folder public as static folder for static file
app.use('/assets', express.static(__dirname + '/public'));

//Page d'acceuil - afficher tout les produits
app.get('/', (req, res) => {
  // res.cookie('hello','valeur',{expire: 3600+Date.now()})
  let sql = "SELECT * FROM product";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.render('product_view', { results: results });
  });
});

//route pour ajouter un produit
app.post('/save', (req, res) => {
  let data = { product_name: req.body.product_name, product_price: req.body.product_price };
  let sql = "INSERT INTO product SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect('/');
  });
});

//route pour modifier un produit
app.post('/update', (req, res) => {
  let sql = "UPDATE product SET product_name='" + req.body.product_name + "', product_price='" + req.body.product_price + "' WHERE product_id=" + req.body.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/');
  });
});

//route pour supprimer un produit
app.post('/delete', (req, res) => {
  let sql = "DELETE FROM product WHERE product_id=" + req.body.product_id + "";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// gérer les erreurs 404
app.use(function (req, res, next) {
  res.setHeader('Content-Type', 'text/plain');
  res.status(404).send('Page introuvable !');
  //res.redirect('/')
});

//server listening
app.listen(8008, () => {
  console.log('Server is running at port 8000');
});
