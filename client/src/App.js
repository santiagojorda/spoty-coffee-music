import { useEffect, useState } from 'react'
import SuperAgent from 'superagent'

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
          console.log(playlistsData)
          setPlaylists(playlistsData)
        })
        .catch( err => console.log(err))
      }
    }
      
    getCovers()
  }, [])

  const addSongToQueue = async (id) => {
    const ADD_NEXT_SONG_ENDPOINT = 'http://localhost:4000/spotify/add'

    try{
      await fetch(ADD_NEXT_SONG_ENDPOINT + `?track_id=${id}`)
        .then( res => {
          console.log(`add a song id: ${id}`)
          console.log(res)
        })
        .catch( err => console.log(err))
    }
    catch (err) {
      console.log(err)
    }
  }

  const renderTracks = () => {
    const itemList = playlists[0].tracks.items.map(item => {
      return <li style={{cursor: 'pointer'}} onClick={() => addSongToQueue(item.track.id)} key={item.track.id}> {item.track.name}</li>
    })

    return <ul>
      {itemList}
    </ul>
  }

  const renderMainCover = () => {
    return <img src={playlists[0].images[0].url}/>
  }

  const changeMainPlaylist = (i) => {
    const newPlaylists = playlists.slice()
    
    let aux = newPlaylists[i] 
    newPlaylists[i] = newPlaylists[0]
    newPlaylists[0] = aux

    setPlaylists(newPlaylists)
  }

  const renderPlaylists = () => {
    const items  = playlists.map( (playlist, i) => {
      if(i > 0){
        return <>
          <div key={i} className='col-4'>
            <img src={playlist.images[0].url} style={{cursor: 'pointer'}} onClick={() => changeMainPlaylist(i)} />
          </div>
        </>
      }
    })
    return items
  }

  return (
    <div className="App">

      <div className="container main-playlist">
        <div className="row">
          <div className="col-6 left">
          {playlists ? renderMainCover() : <>cargando Main Cover</>}
          </div>
          <div className="col-6 right">
            {playlists ? renderTracks() : <>cargando Track List</>}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {playlists ? renderPlaylists() : <>cargando Track List</>}
        </div>
      </div>
      

    </div>
  );
}

export default App;
