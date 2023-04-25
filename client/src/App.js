import { useEffect, useState } from 'react'

function App() {

  const [covers, setCovers] = useState([])
  
  useEffect(() => {
    const track_id = '6qOFCV5N40knhOFTwVw7C2'
    
    const getCovers = async () => {
      console.log('descargando covers')
      const data = await fetch(`http://localhost:4000/spotify/getCover?playlist_id=${track_id}`)
        .then(res => res.json())
      console.log(data)
      setCovers(prev => [...prev, data])
    }

    getCovers()
  }, [])

  useEffect( () => {
    console.log('actual covers:')
    console.log(covers)
  } ,[covers])


  const renderCovers = () => {
    if (covers.length > 1) {
      console.log('hay mas de 1 playlist')
      covers.map( cover => {
        return <>
          <div className="col-4">
            <img key={cover.id} src={cover.url} />
          </div>
        </>
      })
    }  

    else 
      return <>
        <div className="col-4">
          no hay playlists
        </div>
      </>
  }

  return (
    <div className="App">
      <h1>spoty coffee music</h1>


      <div className="container main-playlist">
        <div className="row">
          <div className="col-6 left">
            {
              covers.length > 0 ? <img src={covers[0].url}/> : <p>cargando</p> 
            }

          </div>
          <div className="col-6 right">
            song playlist
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">

          {
            renderCovers()
          }
        </div>
      </div>
      

    </div>
  );
}

export default App;
