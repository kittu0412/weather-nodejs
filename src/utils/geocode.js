const request = require('postman-request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWRpdHlhNCIsImEiOiJja2NlaHlpNjQwOGp3MnptMjUxOTRqYXRxIn0.UDIpzlExaIN2E9beNLiJDQ&limit=1'
    request({ url , json : true}, (error , {body}) => {
            if(error){
                callback('Unable to connect!',undefined)
            }else if(body.features.length === 0){
                callback('Unable to access',undefined)
            }else{
                callback(undefined,{
                    latitude : body.features[0].center[1],
                    longitude : body.features[0].center[0],
                    //location : body.features[0].properties.place_name
                })
            }
         })
}

module.exports = geocode