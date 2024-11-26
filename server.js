const express = require('express')
const app = express();
const db = require('./db')

app.get('/', function (req, res) {
    res.send('hello world')
})
const bodyParser = require('body-parser')
app.use(bodyParser.json())

//import the router files
const managerRoutes=require('./route/managerRoutes')

//use the routers
app.use('/Manager',managerRoutes)

app.listen(3000, () => {
    console.log('listing on port 3000')
})