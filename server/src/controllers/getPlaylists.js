const request = require('superagent')
const SPOTIFY_EP = require('../services/spotify/spotyEndpoints')
const { devMessage, devTitle } = require('../utils/dev')
const { setJsonContentType, setBearerAuthorizationHeader } = require('../utils/httpUtils')

const getPlaylists = async (req, res) => {

    devTitle('SPOTIFY GET PLAYLISTS')

    if(!global.accessToken){
        devMessage('SPOTIFY IS NOT CONNECTED')
        res.redirect('/')
    }
    else {

        console.log(req.body.id)
        const playlistIds = req.body.id 
        
        const QUERY_REQUEST = '?fields=name,description,uri,images(url),tracks.items(track(id,name,album(images),artists(name)))'
        const PLAYLIST_ENDPOINT = 'https://api.spotify.com/v1/playlists/'
        const playlists = []
        console.log(playlistIds)
        let isOk = true
        for(const id of playlistIds){
            console.log(id)
            await request
                .get(PLAYLIST_ENDPOINT + id + QUERY_REQUEST)
                .type(setJsonContentType)
                .use(setBearerAuthorizationHeader(global.accessToken))
                .then( response => { 
                    console.log(`playlist obtained: ${id}`)
                    playlists.push(response.body)
                })
                .catch( err => {
                    console.log(err)
                    isOk = false
                })
            }
            
        if(isOk)
            res.status(200).send(playlists)
        else
            res.status(500).json({message: 'hubo un error'})   
            
    }
}

module.exports = getPlaylists