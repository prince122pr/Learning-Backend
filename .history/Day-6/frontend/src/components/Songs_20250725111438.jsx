import { useState } from "react"

const Songs = () => {

  let [songs, setSongs] = useState([
    {
      'title': 'test_title',
      'artist': 'test_artist',
      'url': 'test_url'
    },
    {
      'title': 'test_title',
      'artist': 'test_artist',
      'url': 'test_url'
    },
    {
      'title': 'test_title',
      'artist': 'test_artist',
      'url': 'test_url'
    }
  ]);

  return (
    <div className="mood-songs">
      
    </div>
  )
}

export default Songs