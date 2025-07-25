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
      <h2></h2>
    </div>
  )
}

export default Songs