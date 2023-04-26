import { useEffect, useState } from 'react'
import SuperAgent from 'superagent'

function App() {

  const  [playlists, setPlaylists] = useState(null)
  useEffect(() => {

    const getCovers = async () => {
      console.log('descargando covers')

      const PLAYLISTS_ENDOPOINT = 'http://localhost:4000/spotify/getPlaylists'
      await SuperAgent
        .post(PLAYLISTS_ENDOPOINT)
        .send({
          id: [
            '5odKqjjuFtyv92914WvX0p', // coffee-music-spotify
            '6qOFCV5N40knhOFTwVw7C2', // 🥤
            '32vUazbtFYfFHucpjhSTUk', // vans
            '4tOHIgXJpcpK6I7dh6jI6h'  // neosoul
          ] 
        })
        .type('application/json')
        .then( response => {
          const playlistsData = response.body
          console.log(playlistsData)
        })
        .catch( err => console.log(err))
    }

    getCovers()
  }, [])

  return (
    <div className="App">
      <h1>spoty coffee music</h1>


      <div className="container main-playlist">
        <div className="row">
          <div className="col-6 left">
            {
              // !covers ? <img src={covers[0].url}/> : <p>cargando</p> 
            }

          </div>
          <div className="col-6 right">
            song playlist
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">

        </div>
      </div>
      

    </div>
  );
}

export default App;
