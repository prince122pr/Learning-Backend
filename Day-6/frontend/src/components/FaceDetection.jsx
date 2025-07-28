import { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import './facedet.css'
import axios from 'axios'

const FaceDetection = ({ setSongs }) => {
  const videoRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingDots, setLoadingDots] = useState('');

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing webcam:", err));
  };

  const loadModels = async () => {
    const MODEL_URL = "/models";
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    ]);
    startVideo();
  };

  const detectMood = () => {
  if (!videoRef.current || videoRef.current.readyState !== 4) return;

  setIsLoading(true); // Show loading immediately

  // Allow React to update UI before blocking code starts
  setTimeout(async () => {
    try {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      if (!detections || detections.length === 0) {
        console.log("No face detected");
        return;
      }

      const expressions = detections[0].expressions;
      const topExpression = Object.entries(expressions).sort(
        (a, b) => b[1] - a[1]
      )[0][0];

      console.log("Expression:", topExpression);

      const res = await axios.get(`http://localhost:3000/songs?mood=${topExpression}`);
      console.log(res.data);
      setSongs(res.data.songs);

    } catch (err) {
      console.error("Error detecting mood or fetching songs:", err);
    } finally {
      setIsLoading(false); // Hide loading message
      console.log('Process finished');
    }
  }, 100); // Allow React to render "Processing..." first
};


  useEffect(() => {
    loadModels();
  }, []);

  // Animate "Processing..." dots
  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingDots(prev => {
          if (prev === '...') return '';
          else return prev + '.';
        });
      }, 500);
    } else {
      setLoadingDots('');
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <div className="face-container">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="face-video rounded-xl"
      />
      <div className="detect-right-part">
        <h2>Live Mood Detection</h2>
        <p>Your current mood is being analyzed in real-time. Enjoy music tailored to <br /> your feelings.</p>

        {isLoading && (
          <div className="loading-popup">
            Processing{loadingDots}
          </div>
        )}

        <button onClick={detectMood} disabled={isLoading}>
          {isLoading ? `Processing${loadingDots}` : 'Click Me'}
        </button>
      </div>
    </div>
  );
};

export default FaceDetection;
