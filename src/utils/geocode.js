const request = require('postman-request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicGFibG9tZW5kZXoiLCJhIjoiY2tmdHcyeG03MGt3azJ3dDhzdGl0a2d1MyJ9.CCVNDpAYptZZLUyGTjaC8A&limit=1'
    
    request({url: url, json: true}, (error, response , body) => {
        if (error) {
            callback('Unable to connect to location service', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode