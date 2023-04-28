import { createContext, useEffect, useState } from 'react'
import SuperAgent from 'superagent'

import TrackList from './components/trackList/TrackList'
import MainPlaylist from './components/mainPlaylist/MainPlaylist'
import PlaylistList from './components/playlistsList/PlaylistList'

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

      <PlaylistsContext.Provider value={{playlists, changeMainPlaylist}}>
        <MainPlaylist />
        <PlaylistList/>
      </PlaylistsContext.Provider>

    </div>
  );
}

export default App;
