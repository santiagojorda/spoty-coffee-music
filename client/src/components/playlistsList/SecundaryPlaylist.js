import { useContext } from "react"
import { PlaylistsContext } from "../../contexts/PlaylistsContext"

export default function SecundaryPlaylist({playlist, actualPosition}) {

    const {changeMainPlaylist} = useContext(PlaylistsContext)

    return(
        <img src={playlist.images[0].url} style={{cursor: 'pointer'}} onClick={() => changeMainPlaylist(actualPosition)} />
    )
}