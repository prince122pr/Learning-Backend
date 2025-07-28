import { CiPlay1 } from "react-icons/ci";
import { AiOutlinePause } from "react-icons/ai";
import './Songs.css';

const Songs = ({ songs }) => {
  return (
    <div className="mood-songs">
      <h2>Recommended Songs</h2>
      {
        songs.map((song, idx) => (
          <div className="each-item" key={idx}>
            <div className="title">
              <h3>{song.title} <span className="mood-tag">({song.mood})</span></h3>
              <p>{song.artist}</p>
            </div>
            <div className="audio-div">
              <audio controls src={song.audio}></audio>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default Songs;
