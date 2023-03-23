const SPOTIFY_EP = require('../services/spotify/spotyEndpoints')
const {devMessage} = require('../utils/dev')
const SPOTY_CREDS = require('../services/spotify/credentials')
const queryString = require('querystring')

const authSpotifyCntrl = (req, res) => {
    devMessage('AUTH SPOTIFY')  
    
    res.redirect(SPOTIFY_EP.AUTH + 
        queryString.stringify({
            response_type: 'code',
            client_id: SPOTY_CREDS.CLIENT_ID,
            redirect_uri: SPOTY_CREDS.REDIRECT_URI,
            scope: SPOTY_CREDS.SCOPES
        })
    )
}


module.exports = authSpotifyCntrl