const express = require('express');
const fs = require("fs");
const app = express();
app.use(express.static('public'));
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient // le pilote MongoDB


app.set('view engine', 'ejs'); // générateur de template
 var util = require("util");


app.get('/formulaire', function (req, res) {

 	//console.log(__dirname);
 	//res.sendFile( __dirname + "/public/html/" + "formulaire.html" );


 res.render('formulaire.ejs')


});


 app.get('/membres', (req, res) => {

 	var cursor = db.collection('adresse').find().toArray(function(err, resultat){
 if (err) return console.log(err)
 	console.log('util = ' + util.inspect(resultat));

 // transfert du contenu vers la vue index.ejs (renders)
 // affiche le contenu de la BD

 res.render('membres.ejs', {adresses: resultat})
 }) 

 	/*fs.readFile( __dirname + "/public/data/" + "membres.json", 'utf8', function (err, data) {

 		
 		console.log( data );
 		res.end( data );

 	});*/
});

app.get('/', (req, res) => {

 console.log('accueil')
 res.end('<h1>Accueil</h1>')

})

app.get('/ajouter', function (req, res) {

 // Preparer l'output en format JSON

console.log('la route /traiter_get')

// on utilise l'objet req.query pour récupérer les données GET
 /*reponse = {
 prenom:req.query.prenom,
 nom:req.query.nom,
 telephone:req.query.telephone,
 courriel:req.query.courriel
 };

console.log(reponse);
fs.readFile(__dirname + "/public/data/" + "membres.json", 'utf8', function (err, data){

	let variable = JSON.parse(data)
	variable.push(reponse)
	let autrevar = JSON.stringify(variable)
	fs.writeFile(__dirname + "/public/data/" + "membres.json", autrevar, function(err, data){

		console.log("allo");

	})
 res.end(JSON.stringify(reponse));
})*/

 db.collection('adresse').save(req.query, (err, result) => {
 if (err) return console.log(err)
 console.log('sauvegarder dans la BD')
 res.redirect('/')
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