const request = require('superagent')
const SPOTIFY_EP = require('../services/spotify/spotyEndpoints')
const { devMessage, devTitle } = require('../utils/dev')
const {setBearerAuthorizationHeader, setJsonContentType} = require('../utils/httpUtils')
const SPOTY_CREDS = require('../services/spotify/credentials')

const getCover = async (req, res) => {

    devTitle('SPOTIFY GET COVER')

    if(!global.accessToken){
        devMessage('SPOTIFY IS NOT CONNECTED')
        res.redirect('/')
    }
    else{
        const playlistId = req.query.playlist_id || '4tOHIgXJpcpK6I7dh6jI6h'
    
        await request
            .get(SPOTIFY_EP.PLAYLIST + `${playlistId}/images`)
            .use(setBearerAuthorizationHeader(global.accessToken))
            .type(setJsonContentType)
            .then((response) => {
                // console.log(res)
                if(response.statusCode == 200 ){

                    devMessage(`Cover obtained`)
                    console.log(response.body)
                    const cover = response.body[0]
                    res.status(200).json({
                        id: playlistId,
                        url: cover.url
                    })
                }
            })
            .catch(err => console.log(err))
    }

}

module.exports = getCover