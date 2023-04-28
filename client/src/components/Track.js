
export default function Track({track}) {

    const addSongToQueue = async () => {
        const ADD_NEXT_SONG_ENDPOINT = 'http://localhost:4000/spotify/add'
        console.log(track.id + ' ' + track.name)
        try{
          await fetch(ADD_NEXT_SONG_ENDPOINT + `?track_id=${track.id}`)
            .then( res => {
              console.log(`add a song id: ${track.id}`)
              console.log(res)
            })
            .catch( err => console.log(err))
        }
        catch (err) {
          console.log(err)
        }
    }

    return (
        <li style={{cursor: 'pointer'}} onClick={addSongToQueue}>
            {track.name}
        </li>
    )
}