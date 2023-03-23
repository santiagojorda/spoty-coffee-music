const {setBearerAuthorizationHeader, setJsonContentType} = require('../utils/httpUtils')
const SPOTIFY_EP = require('../services/spotify/spotyEndpoints')
const request = require('superagent')

const addSongQueueCntrl = async (req, res) => {
    devMessage('SPOTIFY ADD SONG TO QUEUE')
    const access_token = 'this is a accesstoken trucho'
    console.log(`access_token: ${access_token}`)

    await request
        .post(SPOTIFY_EP.PLAYER_QUEUE)
        .query({ uri: 'spotify:track:5f2ZVFERwwh3asebmurZEf' })
        .use(setBearerAuthorizationHeader(access_token))
        .type(setJsonContentType)
        .then((res) => {
            // console.log(response)
            res.send(res.body)
        })

}

module.exports = addSongQueueCntrl