const SPOTIFY_EP = () => {
    const ACCOUNT = 'https://accounts.spotify.com/'
    const AUTH = ACCOUNT + 'authorize'
    const TOKEN = ACCOUNT + 'api/token'
    const API = 'https://api.spotify.com/v1/'
    const PLAYER_QUEUE = API + 'me/player/queue'
    const PLAYLIST = API + 'playlists/'
  
    return {
      ACCOUNT,
      AUTH,
      TOKEN,
      API,
      PLAYER_QUEUE,
      PLAYLIST
    }
}

module.exports = SPOTIFY_EP()