const request = require('superagent')
const SPOTIFY_EP = require('../services/spotify/spotyEndpoints')
const { devMessage, devTitle } = require('../utils/dev');
const {setBasicAuthorizationHeader, setFormContentType} = require('../utils/httpUtils')
const SPOTY_CREDS = require('../services/spotify/credentials');

const callbackSpotifyCntrl = async (req, res) => {
    devTitle('SPOTIFY AUTH CALLBACK')

    let code = req.query.code || null;
    // devMessage(`callback code: ${code}`)
    // console.log(code)
    if (code === null) 
        console.log('code null')
        // res.redirect('/#?error=state_mismatch')
    
    else {

        await request
            .post(SPOTIFY_EP.TOKEN)
            .send({
                code: code,
                redirect_uri: SPOTY_CREDS.REDIRECT_URI,
                grant_type: 'authorization_code'
            })
            .type(setFormContentType)
            .use(setBasicAuthorizationHeader)
            .then( async res => {
                if (res.statusCode === 200) {
                    const body = res.body

                    //guardar en la base de datos ??
                    global.access_token = body.access_token
                    global.refresh_token = body.refresh_token
                    global.expires_in = body.expires_in

                    devMessage(`ACCESS_TOKEN: ${global.access_token}`)
                    devMessage(`REFRESH_TOKEN: ${global.refresh_token}`)

                    // res.send('callback')
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
}

module.exports = callbackSpotifyCntrl