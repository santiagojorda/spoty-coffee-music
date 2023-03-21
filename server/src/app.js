const express = require('express')
const { devMessage } = require('./utils/dev')
const app = express()

devMessage('INITIALIZING SERVER')

require('./config/env_vars_init')
const {PORT, HOST} = process.env

app.listen(PORT, HOST, (req, res) => {
    devMessage(`SERVER INITIALIZED SUCCESSFULLY: ${HOST}:${PORT}`)
})

module.exports = app