import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';

const FaceDetection = () => {
  const videoRef = useRef(null);
  const [detectedMood, setDetectedMood] = useState('No face detected');

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: {} })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch(err => console.error('Error accessing webcam:', err));
  };

  const loadModels = async () => {
    const MODEL_URL = '/models'; // Models must be in public/models
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    ]);
    startVideo();
  };

  const detectMood = async () => {
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();

    if (!detections || detections.length === 0) {
      setDetectedMood('No face detected');
      return;
    }

    const expressions = detections[0].expressions;
    const sorted = Object.entries(expressions).sort((a, b) => b[1] - a[1]);
    const topExpression = sorted[0][0];

    setDetectedMood(topExpression);
  };

  useEffect(() => {
    loadModels();

    const interval = setInterval(detectMood, 2000); // auto-check every 2s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="face-container" style={styles.container}>
      <video
        ref={videoRef}
        autoPlay
        muted
        width="720"
        height="560"
        className="face-video"
        style={styles.video}
      />
      <p style={styles.moodText}>Detected Mood: <strong>{detectedMood}</strong></p>
      <button onClick={detectMood} style={styles.button}>Detect Mood Now</button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    marginTop: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  video: {
    border: '3px solid #4caf50',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.2)'
  },
  moodText: {
    fontSize: '20px',
    color: '#333',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};

export default FaceDetection;
