const request = require('postman-request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9aab0df0b4865be32b66235eabbe8d52&query='+latitude+','+longitude+'&units=m'
    request({ url , json : true}, (error , {body}) => {
            if(error){
                callback('Unable to connect!',undefined)
            }else if(body.error){
                callback('Unable to access',undefined)
            }else{
                callback(undefined,'Temperatue: '+body.current.temperature+' Condition: '+body.current.weather_descriptions[0])
            }
        })
}


module.exports = forecast 