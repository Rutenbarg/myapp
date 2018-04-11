// Onze voorraad met auto's
let stock = [
    { serienummer: 10001, merk: 'BMW', type: '635i', bouwjaar: 1985, kleur: 'Blauw', prijs: 10250 },
    { serienummer: 10002, merk: 'BMW', type: '535i', bouwjaar: 2010, kleur: 'Grijs', prijs: 24500 },
    { serienummer: 10003, merk: 'BMW', type: '740d', bouwjaar: 1999, kleur: 'Rood', prijs: 2995 },
    { serienummer: 10004, merk: 'BMW', type: '330i', bouwjaar: 2003, kleur: 'Rood', prijs: 4500 },
    { serienummer: 10005, merk: 'BMW', type: '530d', bouwjaar: 2006, kleur: 'Groen', prijs: 9500 },
    { serienummer: 10006, merk: 'BMW', type: '218i', bouwjaar: 2015, kleur: 'Paars', prijs: 28950 },
    { serienummer: 10007, merk: 'BMW', type: '118d', bouwjaar: 2012 , kleur: 'Zilver', prijs: 18900 },
    { serienummer: 10008, merk: 'BMW', type: 'M6',   bouwjaar: 2004, kleur: 'Bruin', prijs: 23450 },
    { serienummer: 10009, merk: 'BMW', type: 'M135i', bouwjaar: 2014, kleur: 'Wit', prijs: 14500 },
    { serienummer: 10010, merk: 'BMW', type: '535d', bouwjaar: 2008, kleur: 'Geel', prijs: 12500 }
]

// Het express object gebruikt de require method om express te toe te wijzen als programma
const express = require('express')
// Het app object verwijst naar express
const app = express()
// Het bodyparses object roept hier de body-parser aan
const bodyParser = require('body-parser')

// Met deze method vertel je de body-parser dat deze alleen JSON objects mag gebruiken
app.use(bodyParser.json())

// HTTP GET opdracht, roept het request en response object aan en antwoord als een JSON object
app.get('/', (req, res) => res.json({hello : 'This is a JSON REST service in JavaScript!'}))

/**
 * De URL is /cars en de aanroep is een HTTP GET opdracht.
 * Haalt het JSON object 'stock' op met voorraad auto's  
 * Als de request goed uitgevoerd is, stuur status 200 terug met het JSON object
 */
app.get('/cars', function (req, res) {
	res.status(200).json(stock)
})



/**
 * De URL is /cars en de aanroep is een HTTP GET opdracht.
 * Zoek een auto uit de voorraad en presenteer die op de webpagina  
 * Als de request goed uitgevoerd is, stuur status 200 terug met het gevonden JSON car object
 * Als de request niet uitgevoerd kan worden, stuur response status 404 terug
 */

app.get('/cars/:id', function (req, res) {
	// local variable 
	let carId = reqarams.id
	// Find method om de auto met serienummer uit de vooraad te vinden
	let car = stock.find(stockCar => stockCar.serienummer == carId)
	if (car !== undefined) {
		res.status(200).json(car)
	} else {
		res.sendStatus(404)
	}
})

/**
 * Voegt een nieuw record toe aan de bestaande voorraad.
 * De URL is /cars en de aanroep is een HTTP POST opdracht.
 * De Content-Type header is application/json.
 * De body content is een JSON object met de properties van een auto.
 */
app.post('/cars', function (req, res) {
	// Haal alle serienummers op uit de voorraad en plaats deze in een nieuwe array
	let serialNumbers = Array.from(stock, car => car.serienummer)
	// Haal de maximum waarde van de serienummers op uit de array
	let max = Math.max(...serialNumbers)
	// Ken een nieuwe waarde toe aan het serienummer van de nieuwe auto en neem daarvoor de max + 1
	req.body.serienummer = ++max
	// Voeg de nieuwe auto toe aan de voorraad
	stock.push(req.body)
	// Stuur een HTTP status 201 en een body met de nieuwe auto terug naar de client
	res.status(201).json(req.body)
})

app.put('/cars/:id', function (req, res) {
	let carId = req.params.id
	let car = stock.find(stockCar => stockCar.serienummer == carId)
	if (car !== undefined) {
		car.bouwjaar = req.body.bouwjaar
		car.kleur = req.body.kleur
		car.merk = req.body.merk
		car.prijs = req.body.prijs
		car.type = req.body.type
		res.status(201).json(req.body)
	} else {
		res.sendStatus(404)
	}
})

app.delete('/cars/:id', function (req, res) {
	let carId = req.params.id
	let index = stock.findIndex(car => car.serienummer == carId);
	if (index > -1) {
		stock.splice(index, 1)
		res.sendStatus(204)
	} else {
		res.sendStatus(404)
	}
})

app.all('/cars', function (req, res, next) {
	console.log('Accessing the secret section ...')
	next() // pass control to the next handler
})

// Vertelt de client dat deze moet luisteren op port:3000
app.listen(3000, () => console.log('Example app listening on port 3000!'))