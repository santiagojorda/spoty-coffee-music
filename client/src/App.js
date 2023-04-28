import { createContext, useEffect, useState } from 'react'
import SuperAgent from 'superagent'

import TrackList from './components/TrackList'
import MainPlaylist from './components/MainPlaylist'
import PlaylistList from './components/PlaylistList'

import { PlaylistsContext } from './contexts/PlaylistsContext'

function App() {

  const  [playlists, setPlaylists] = useState(null)
  
  useEffect(() => {
    let requestWasSent = false
    const getCovers = async () => {
      if(!requestWasSent) {
        console.log('descargando covers')
        requestWasSent = true
        const PLAYLISTS_ENDOPOINT = 'http://localhost:4000/spotify/getPlaylists'
        await SuperAgent
        .post(PLAYLISTS_ENDOPOINT)
        .send({
          id: [
            '6qOFCV5N40knhOFTwVw7C2', // 🥤
            '5odKqjjuFtyv92914WvX0p', // coffee-music-spotify
            '32vUazbtFYfFHucpjhSTUk', // vans
            '4tOHIgXJpcpK6I7dh6jI6h'  // neosoul
          ] 
        })
        .type('application/json')
        .then( response => {
          const playlistsData = response.body
          setPlaylists(playlistsData)
        })
        .catch( err => console.log(err))
      }
    }
      
    getCovers()
  }, [])

  const changeMainPlaylist = (i) => {
    const newPlaylists = playlists.slice()
    
    let aux = newPlaylists[i] 
    newPlaylists[i] = newPlaylists[0]
    newPlaylists[0] = aux

    setPlaylists(newPlaylists)
  }

  return (
    <div className="App">

      <div className="container main-playlist">
        <div className="row">
          <div className="col-6 left">
            {playlists ? <MainPlaylist playlist={playlists[0]}/> : <>cargando Main Cover</>}
          </div>
          <div className="col-6 right">
            {playlists ? <TrackList tracks={playlists[0].tracks.items} /> : <>cargando Track List</>}
          </div>
        </div>
      </div>

      <PlaylistsContext.Provider value={{changeMainPlaylist}}>
        <PlaylistList playlists={playlists} />
      </PlaylistsContext.Provider>

    </div>
  );
}

export default App;
