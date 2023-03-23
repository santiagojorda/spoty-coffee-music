const request = require('superagent')
const SPOTIFY_EP = require('../services/spotify/spotyEndpoints')
const { devMessage } = require('../utils/dev');
const {setBasicAuthorizationHeader, setFormContentType} = require('../utils/httpUtils')
const SPOTY_CREDS = require('../services/spotify/credentials')

const callbackSpotifyCntrl = async (req, res) => {
    devMessage('SPOTIFY AUTH CALLBACK')

    let code = req.query.code || null;
    console.log(SPOTIFY_EP.TOKEN)
    console.log(code)
    // if (code === null) 
    //     console.log('code null')
    //     // res.redirect('/#?error=state_mismatch')
    
    // else {

    //   await request
    //     .post(SPOTIFY_EP.TOKEN)
    //     .send({
    //       code: code,
    //       redirect_uri: SPOTY_CREDS.REDIRECT_URI,
    //       grant_type: 'authorization_code'
    //     })
    //     .type(setFormContentType)
    //     .use(setBasicAuthorizationHeader)
    //     .then((res) => {
    //       if (response.statusCode === 200) {
    //         const body = response.body

    //         //guardar en la base de datos
    //         const access_token = body.access_token    
    //         const refresh_token = body.refresh_token
    //         const expires_in = body.expires_in
    //         res.send(access_token)

    //         // CALLBACK CLIENT SIDE 
    //         // res.redirect(`http://localhost:3000/callback?`+ 
    //         //     querystring.stringify({
    //         //         access_token: body.access_token,
    //         //         refresh_token: body.refresh_token,
    //         //         expires_in: body.expires_in
    //         //     }))
    //       }
    //     });
    // }
}

module.exports = callbackSpotifyCntrl