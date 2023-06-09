const request = require('superagent')

const SPOTIFY_EP = require('../services/spotify/spotyEndpoints')
const {setBearerAuthorizationHeader, setJsonContentType} = require('../utils/httpUtils')
const {devMessage, devTitle} = require('../utils/dev')


const addSongQueueCntrl = async (req, res) => {

    devTitle('SPOTIFY ADD SONG TO QUEUE')

    if(!global.accessToken){
        devMessage('SPOTIFY IS NOT CONNECTED')
        res.redirect('/')
    }
    else{
        const track_id = req.query.track_id || '4iV5W9uYEdYUVa79Axb7Rh'
    
        await request
            .post(SPOTIFY_EP.PLAYER_QUEUE)
            .query({ uri: `spotify:track:${track_id}` })
            .use(setBearerAuthorizationHeader(global.accessToken))
            .type(setJsonContentType)
            .then((response) => {
                // console.log(res)
                if(response.statusCode == 204 ){
                    devMessage(`song added to queue`)
                    res.status(200)
                }
            })
            .catch(err => console.log(err))

    }



}

module.exports = addSongQueueCntrl