import { useState } from 'react';
import FaceDetection from './components/FaceDetection'
import Songs from './components/Songs'

const App = () => {

    let [songs, setSongs] = useState([]);

  return (
    <div className='parentApp'>
      <FaceDetection setSongs = {setSongs}/>
      <Songs songs = {songs}/>
    </div>
  )
}

export default App