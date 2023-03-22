const express = require('express')
const router = express.Router()

const superagent = require('superagent')
const querystring = require('querystring')
const creds = require('../services/spotify/credentials')
const base64 = require('base-64');
const { devMessage } = require('../utils/dev')
const fs = require('fs')

const SPOTY_AUTH_URL = 'https://accounts.spotify.com'
const SPOTY_AUTH_PATH = SPOTY_AUTH_URL + '/authorize?'
const SPOTY_TOKEN_PATH = SPOTY_AUTH_URL + '/api/token'

let refresh_token = ''
let access_token = ''
let expires_in = ''

const setHeader = (key, value) => {
    return (req) => {
      req.set(key,value)
      return req
    }
}
const encoded_cred = base64.encode(`${creds.CLIENT_ID}:${creds.CLIENT_SECRET}`);
const setBasicAuthorizationHeader = setHeader('Authorization', 'Basic ' +  encoded_cred)
const setJsonContentType = setHeader('Content-type', 'application/json')
const setFormContentType = setHeader('Content-Type', 'application/x-www-form-urlencoded')
const setBearerAuthorizationHeader = (access_token) => setHeader('Authorization', 'Bearer ' +  access_token)


router.get('/spotify/login', (req, res) => {
    devMessage('AUTH SPOTIFY')  
    res.redirect(SPOTY_AUTH_PATH +
      querystring.stringify({
        response_type: 'code',
        client_id: creds.CLIENT_ID,
        redirect_uri: creds.REDIRECT_URI,
        scope: creds.SCOPES
      })
    )
})

router.get('/spotify/callback', async (req, res) => {
    let code = req.query.code || null;
    console.log(code)
    if (code === null) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } 
    
    else {
      await superagent
        .post(SPOTY_TOKEN_PATH)
        .send({
          code: code,
          redirect_uri: creds.REDIRECT_URI,
          grant_type: 'authorization_code'
        })
        .use(setFormContentType)
        .use(setBasicAuthorizationHeader)
        .end((err, response) => {
          if (!err && response.statusCode === 200) {

            const body = response.body

            access_token = body.access_token
            refresh_token = body.refresh_token
            expires_in = body.expires_in
            res.send(access_token)

            // CALLBACK CLIENT SIDE 
            // res.redirect(`http://localhost:3000/callback?`+ 
            //     querystring.stringify({
            //         access_token: body.access_token,
            //         refresh_token: body.refresh_token,
            //         expires_in: body.expires_in
            //     }))
          }
        });
    }
})

router.get(`/spotify/add`, async (req, res) => {
    console.log(`access_token: ${access_token}`)
    await superagent
        .post("https://api.spotify.com/v1/me/player/queue?" + 
            querystring.stringify({
                uri: 'spotify:track:5f2ZVFERwwh3asebmurZEf'
        }))
        .use(setBearerAuthorizationHeader(access_token))
        .use(setJsonContentType)
        .end((err, response) => {
            // console.log(response)
            res.send(response.body)
        })

})

router.get(`/spotify/saveCover`, async (req, res) => {

    const fileName = 'portada.jpg'
    const playlist_id_test = '5odKqjjuFtyv92914WvX0p'
    let coverUrl = ''
    await superagent
        .get(`https://api.spotify.com/v1/playlists/${playlist_id_test}/images`)
        .use(setBearerAuthorizationHeader(access_token))
        .use(setJsonContentType)
        .end(async (err, response) => {
            if(err) console.log(`error al buscar en spotify la playlist: ${err}`)
            coverUrl = await response.body[0].url
            console.log(`url obtenida: ${coverUrl}`)      
            if(coverUrl){
                console.log(`url leida: ${coverUrl}`)
                await superagent
                    .get(coverUrl)
                    .end( (err, res) => {
                        console.log(res); // body is Buffer
                        if(err) console.log(`error al descargar la imagen portada: ${err}`)
                        fs.writeFile(fileName, res.body, (err) => {
                            if(err) console.log(`error al escribir la imagen portada: ${err}`)
                            else console.log(`La imagen ${fileName} ha sido descargada exitosamente`)
                        })
                    })
            }   
        })

        
   
    res.send('descarga imagen')
})


module.exports = router