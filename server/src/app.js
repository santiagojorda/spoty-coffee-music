const express = require('express')
const { devTitle } = require('./utils/dev')
const app = express()

devTitle('---- ---- ---- ----')
devTitle('INITIALIZING SERVER')

require('./config/env_vars_init')
const {PORT, HOST} = process.env

app.use('/spotify', require('./routes/spotify'))

app.listen(PORT, HOST, (req, res) => {
    devTitle(`SERVER INITIALIZED SUCCESSFULLY ON: ${HOST}:${PORT}`)
})


module.exports = app