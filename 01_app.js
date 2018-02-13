let express = require('express');
let app = express();
app.use(express.static('public'));
/* on associe le moteur de vue au module «ejs» */
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient // le pilote MongoDB

app.set('view engine', 'ejs'); // générateur de template
 var util = require("util");

/////////////////////////////////////route accueil
app.get('/', function (req, res) {


	var cursor = db.collection('adresse')
                .find().toArray(function(err, resultat){
 if (err) return console.log(err)
 	console.log('util = ' + util.inspect(resultat));
 // transfert du contenu vers la vue index.ejs (renders)
 // affiche le contenu de la BD
 res.render('gabarit2.ejs', {adresses: resultat})
 }) 
})

let db // variable qui contiendra le lien sur la BD

MongoClient.connect('mongodb://127.0.0.1:27017', (err, database) => {
 if (err) return console.log(err)
 
 db = database.db('carnet_adresse');
// lancement du serveur Express sur le port 8081
 app.listen(8081, () => {
 console.log('connexion à la BD et on écoute sur le port 8081')
 })
})