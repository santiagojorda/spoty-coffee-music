import SecundaryPlaylist from "./SecundaryPlaylist"

export default function PlaylistList({playlists}) {

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