import { useState } from "react"
import { CiPlay1 } from "react-icons/ci";
import { AiOutlinePause } from "react-icons/ai";

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
      <h2>Recommended Songs</h2>

      {
        songs.map((song, idx) => (
          <div key={idx}>
            <div className="title">
              <h2>{song.title}</h2>
              <p>{song.artist}</p>
            </div>
            <div className="play-pause-btn">
              <CiPlay1/>
            </div>
          </div>
        ))
      }

    </div>
  )
}

export default Songs