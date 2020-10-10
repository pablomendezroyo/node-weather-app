const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Pablo Mendez'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'How can I help you?',
        title: 'Help',
        name: 'Pablo Mendez'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Pablo Mendez'
    })  
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geoCode(req.query.address, (error, data = {}) => {
        if (error) {
            res.send({ error })
        } else {
            forecast(data.latitude, data.longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }
                res.send({
                    forecast: forecastData,
                    location: data.location,
                    address: req.query.address
                })
            })
        } 
    })
})

app.get('/products', (req, res) => {
    //This code will only run if the key search is provided
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } 
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found',
        name: 'Pablo Mendez',
        title: '404'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found',
        name: 'Pablo Mendez',
        title: '404'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})