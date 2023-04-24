const express = require('express')
const router = express.Router()

const authSpotifyCntrl = require('../controllers/authSpotify')
router.get('/auth', authSpotifyCntrl)

const callbackSpotifyCntrl = require('../controllers/callbackSpotify')
router.get('/callback', callbackSpotifyCntrl)

const addSongQueueCntrl = require('../controllers/addSongQueue')
router.get(`/add`, addSongQueueCntrl) 

const getCover = require('../controllers/getCover')
router.get(`/getCover`, getCover) 

// const fs = require('fs')

// router.get(`/spotify/saveCover`, async (req, res) => {
//     saveCover()
//     const fileName = 'portada.jpg'
//     const playlist_id_test = '5odKqjjuFtyv92914WvX0p'
//     let coverUrl = ''

//     await request
//         .get(`https://api.spotify.com/v1/playlists/${playlist_id_test}/images`)
//         .use(setBearerAuthorizationHeader(access_token))
//         .type(setJsonContentType)
//         .then(async (response) => {
//             coverUrl = await response.body[0].url
//             console.log(`url obtenida: ${coverUrl}`)      
//             if(coverUrl){
//                 console.log(`url leida: ${coverUrl}`)

//                 await request
//                     .get(coverUrl)
//                     .then( (res) => {
//                         fs.writeFile(fileName, res.body, (err) => {
//                             if(err) console.log(`error al escribir la imagen portada: ${err}`)
//                             else console.log(`La imagen ${fileName} ha sido descargada exitosamente`)
//                         })
//                     })
//                     .catch(err => console.log(`error al descargar la imagen portada: ${err}`))
//             }   
//         })
//         .catch( err => console.log(`error al buscar en spotify la playlist: ${err}`))

        
   
//     res.send('descarga imagen')
// })


module.exports = router