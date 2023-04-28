import TrackList from "../trackList/TrackList"
import { useContext } from "react"
import { PlaylistsContext } from "../../contexts/PlaylistsContext"

export default function MainPlaylist() {

    const {playlists} = useContext(PlaylistsContext)

    return(
        <div className="container main-playlist">
            <div className="row">
            <div className="col-6 left">
                {playlists ? <img src={playlists[0].images[0].url}/> : <>cargando Main Cover</>}
            </div>
            <div className="col-6 right">
                {playlists ? <TrackList tracks={playlists[0].tracks.items} /> : <>cargando Track List</>}
            </div>
            </div>
        </div>
    )
}