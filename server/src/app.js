const express = require('express')
const { devMessage } = require('./utils/dev')
const app = express()

devMessage('---- ---- ---- ----')
devMessage('INITIALIZING SERVER')

require('./config/env_vars_init')
const {PORT, HOST} = process.env

app.use('/spotify', require('./routes/spotify'))

app.listen(PORT, HOST, (req, res) => {
    devMessage(`SERVER INITIALIZED SUCCESSFULLY ON: ${HOST}:${PORT}`)
})


module.exports = app