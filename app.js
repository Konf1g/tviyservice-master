const express = require('express');

const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const nodemailer = require("nodemailer");
const config = require('./config');


const app = express();
const port = config.port;

app.use(fileUpload());

app.set('view engine', 'ejs');
app.use('/stylesheets', express.static(__dirname + '/public/stylesheets'));
app.use('/images', express.static(__dirname + '/public/images'));
app.use('/scripts', express.static(__dirname + '/public/scripts'));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
	extended: true
})); // support encoded bodies

app.use(cookieParser());

app.listen(port, () => {
	console.log("server started on ", port, "port")
});

app.get('/', (req, res) => {
	
	res.render('index_ua');
});

app.get('/ru', (req, res) => {
	res.render('index_ru');
});

app.get('/ua', (req, res) => {
	res.render('index_ua');
});

app.get('/painting', (req,res) => {
	res.render('paint_ua');
});

app.get('/ru/painting', (req,res) => {
	res.render('paint_ru');
});

app.get('/to_and_repair', (req,res) => {
	res.render('tor_ua');
});

app.get('/ru/to_and_repair', (req,res) => {
	res.render('tor_ru');
});

app.get('/parts', (req,res) => {
	res.render('parts_ua');
});

app.get('/ru/parts', (req,res) => {
	res.render('parts_ru');
});

app.get('/price', (req,res) => {
	res.render('price_ua');
});

app.get('/ru/price', (req,res) => {
	res.render('price_ru');
});

app.get('/price_bus', (req,res) => {
	res.render('price_ua_bus');
});

app.get('/ru/price_bus', (req,res) => {
	res.render('price_ru_bus');
});

app.post('/sndmsg', (req, res) => {
	let msg = {
		name: req.body.name,
		phone: req.body.phone,
		msg: req.body.msg
	};
	console.log(req.body);

	sendmail(msg.name, msg.phone, msg.msg)
		.then( res.render('index_ua') )
		.catch(console.error);
})

app.post('/rusndmsg', (req, res) => {
	let msg = {
		name: req.body.name,
		phone: req.body.phone,
		msg: req.body.msg
	};
	console.log(req.body);

	sendmail(msg.name, msg.phone, msg.msg)
		.then( res.render('index_ru') )
		.catch(console.error);
})

app.use(function (req, res, next) {
	res.redirect('/')
	//for 404 error
});