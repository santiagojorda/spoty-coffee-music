const express = require('express')
const cors = require('cors')
const { devTitle } = require('./utils/dev')
const app = express()
app.use(cors())
devTitle('---- ---- ---- ----')
devTitle('INITIALIZING SERVER')

require('./config/env_vars_init')
const {PORT, HOST} = process.env

app.use('/spotify', require('./routes/spotify'))

app.listen(PORT, HOST, () => {
    devTitle(`SERVER INITIALIZED SUCCESSFULLY ON: ${HOST}:${PORT}`)
})

if(!global.access_token){
    const spotyAuth = require('./controllers/authSpotify')
    app.get('/', (req, res) => {
        spotyAuth(req,res)
    })
}

module.exports = app