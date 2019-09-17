const express = require('express')
const app = express()
const low = require('lowdb')
const cron = require('./cron')

const { db } = require("./src/db")




app.get('/', async (req, res) => {

    // Get db.json content
    const activities = await db.getState()
    
    res.json(activities)

})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server is up on 3000')
})
