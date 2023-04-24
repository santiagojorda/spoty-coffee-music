const request = require('superagent')
const SPOTIFY_EP = require('../services/spotify/spotyEndpoints')
const { devMessage, devTitle } = require('../utils/dev')
const {setBearerAuthorizationHeader, setJsonContentType} = require('../utils/httpUtils')
const SPOTY_CREDS = require('../services/spotify/credentials')

const getCover = async (req, res) => {

    devTitle('SPOTIFY GET COVER')

    if(!global.access_token){
        devMessage('SPOTIFY IS NOT CONNECTED')
        res.redirect('/')
    }
    else{
        const coverId = '4tOHIgXJpcpK6I7dh6jI6h'
    
        await request
            .get(SPOTIFY_EP.PLAYLIST + `${coverId}/images`)
            .use(setBearerAuthorizationHeader(global.access_token))
            .type(setJsonContentType)
            .then((res) => {
                console.log(res)
                devMessage(`song added to queue`)
            })
    }

}

module.exports = getCover