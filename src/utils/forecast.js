const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6ea6ae50d8ac930cbfce9d6ebe98e848&query=' + latitude + ',' + longitude + '&units=m'

    request({url: url, json: true}, (error, response, body) => {
        if (error) {
            callback('Unable to connect to weatherstack service', undefined)
        } else if (body.error) {
            callback('Wrong query', undefined)
        } else {
            callback(undefined, `${body.current.weather_descriptions}. It is current ${body.current.temperature} degrees outside. There is a ${body.current.precip} % chances of rain`)
        }
    })
}

module.exports = forecast