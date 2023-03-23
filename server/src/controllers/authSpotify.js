const SPOTIFY_EP = require('../services/spotify/spotyEndpoints')
const {devMessage, devTitle} = require('../utils/dev')
const SPOTY_CREDS = require('../services/spotify/credentials')

const authSpotifyCntrl = (req, res) => {
    devTitle('SPOTIFY AUTH')
    
    const auth_object_query = {
        response_type: 'code',
        client_id: SPOTY_CREDS.CLIENT_ID,
        redirect_uri: SPOTY_CREDS.REDIRECT_URI,
        scope: SPOTY_CREDS.SCOPES
    }

    const auth_query = '?' + new URLSearchParams(auth_object_query).toString()
    devMessage(SPOTIFY_EP.AUTH + auth_query)
    
    res.redirect(SPOTIFY_EP.AUTH + auth_query)
}


module.exports = authSpotifyCntrl