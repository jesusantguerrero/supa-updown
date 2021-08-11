require('dotenv').config()
const { runBackground } = require('./script');
const express = require('express');
const app = express()

app.get('/background', async (_req, res) => {
    await runBackground()
    res.send('Background ran')
})

app.get('/', async (_req, res) => {
    res.send('Welcome to supadown API')
})

app.listen(process.env.PORT || 3000)