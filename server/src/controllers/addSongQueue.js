const request = require('superagent')

const SPOTIFY_EP = require('../services/spotify/spotyEndpoints')
const {setBearerAuthorizationHeader, setJsonContentType} = require('../utils/httpUtils')
const {devMessage, devTitle} = require('../utils/dev')

const addSongQueueCntrl = async (access_token) => {
    devTitle('SPOTIFY ADD SONG TO QUEUE')

    await request
        .post(SPOTIFY_EP.PLAYER_QUEUE)
        .query({ uri: 'spotify:track:5f2ZVFERwwh3asebmurZEf' })
        .use(setBearerAuthorizationHeader(access_token))
        .type(setJsonContentType)
        .then((res) => {
            // console.log(response)
            devMessage(`song added to queue`)
        })

}

module.exports = addSongQueueCntrl