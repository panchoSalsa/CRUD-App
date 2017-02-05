const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

var db; 

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, database) {
	if(err) {
		console.log(err);
	}
	db = database;

	app.listen(3000, function() {
		console.log('listening on 3000');
	});
});

app.use(bodyParser.urlencoded({extended:true}));

// teach our server app to read json
app.use(bodyParser.json());

// make public folder accessible to the public
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req,res) => {
	// res.send('hello world');
	// res.sendFile(__dirname + '/index.html');
	// console.log(__dirname);
	db.collection('quotes').find().toArray((err,result) => {
		if (err) return console.log(err);

		// renders index.ejs
		res.render('index.ejs', {quotes:result});
	});
});

app.post('/quotes', (req,res) => {
	db.collection('quotes').save(req.body, (err,result) => {
		if (err) {
			return console.log(err);
		}

		console.log('saved to db');

		res.redirect('/');
	});
	
});

app.put('/quotes', (req,res) => {
	db.collection('quotes')
		.findOneAndUpdate({name:'Yoda'}, {
			$set: {
				name: req.body.name,
				quote: req.body.quote
			}
		}, {
			sort: {_id: -1},
			upsert: true
		}, (err,result) => {
			if (err) return res.send(err);

			res.send(result);
		});
});

app.delete('/quotes', (req, res) => {
	db.collection('quotes').findOneAndDelete({name: req.body.name},
	(err, result) => {
		if (err) return res.send(500, err)
		res.send(result)
	})
});