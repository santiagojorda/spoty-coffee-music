import Track from "../tracks/Track"

export default function TrackList({tracks}) {

  
  const renderTracks = () => {
    return tracks.map( item => {
      const track = item.track
      return <Track key={track.id} track={track} />
    })
  }

  return (
    <ul>
      { renderTracks() }
    </ul>
  )
}
  

