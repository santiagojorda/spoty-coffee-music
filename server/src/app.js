const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json());

const cors = require('cors')
app.use(cors())

const { devTitle } = require('./utils/dev')
devTitle('---- ---- ---- ----')
devTitle('INITIALIZING SERVER')

require('./config/env_vars_init')
const {PORT, HOST} = process.env

app.use('/spotify', require('./routes/spotify'))

app.listen(PORT, HOST, () => {
    devTitle(`SERVER INITIALIZED SUCCESSFULLY ON: ${HOST}:${PORT}`)
})

if(!global.accessToken){
    const spotyAuth = require('./controllers/authSpotify')
    app.get('/', (req, res) => {
        spotyAuth(req,res)
    })
}

module.exports = app