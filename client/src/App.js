import { useEffect } from 'react'

function App() {
  
  useEffect(() => {
    const track_id = '36L4txvOPbX3X837x1g3vu'
    fetch(`http://localhost:4000/spotify/add?track_id=${track_id}`)
  }, [])

  return (
    <div className="App">
      spoty coffee music
    </div>
  );
}

export default App;
