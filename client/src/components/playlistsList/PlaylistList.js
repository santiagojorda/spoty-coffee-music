import { useContext } from "react"
import SecundaryPlaylist from "./SecundaryPlaylist"
import { PlaylistsContext } from "../../contexts/PlaylistsContext"

export default function PlaylistList() {

    const {playlists} = useContext(PlaylistsContext)

    const renderPlaylists = () => {
        const items  = playlists.map( (playlist, i) => {
          if(i > 0){
            return <>
              <div key={i} className='col-4'>
                <SecundaryPlaylist playlist={playlist} actualPosition={i}/>
              </div>
            </>
          }
        })
        return items
      }

    return(<>
        <div className="container">
            <div className="row">
                {playlists ? renderPlaylists() : <>cargando Track List</>}
            </div>
        </div> 
    </>)
}