const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('postman-request')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const { ESRCH } = require('constants')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname , '../public')))
const viewsPath = path.join(__dirname , '../templetes/views')
const partialsPath = path.join(__dirname,'../templetes/partials')

app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather',
        name : 'Aditya'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name : 'Aditya'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name : 'Aditya'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'No address provided'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude} = {})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error , forecastData)=>{
            if(error){
                return res.send({error})   
            }
            res.send({
                forecast: forecastData,
                //location,
                address: req.query.address
            })
        })
    })
})

app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error : 'You has no search item'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : 'Help Error',
        errorMessage : 'Help page not found',
        name : 'Aditya'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title : 'Error',
        errorMessage : '404 page',
        name : 'Aditya'
    })
})

app.listen(port,()=>{
    console.log('Server is running.')
})