import React, { useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';

const FaceDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

    const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: {} })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch(err => console.error('Error accessing webcam:', err));
    };

    const loadModels = async () => {
      const MODEL_URL = '/models'; // Public folder
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      ]);

      startVideo();
    };



  useEffect(() => {

    loadModels();
  }, []);

  const handlePlay = () => {
    // const canvas = faceapi.createCanvasFromMedia(videoRef.current);
    // canvasRef.current.innerHTML = '';
    // canvasRef.current.appendChild(canvas);

    const displaySize = {
      width: videoRef.current.videoWidth,
      height: videoRef.current.videoHeight,
    };
    // faceapi.matchDimensions(canvas, displaySize);

    

  return (
    <div className="face-container">
      <video
        ref={videoRef}
        autoPlay
        muted
        width="720"
        height="560"
        onPlay={handlePlay}
        className="face-video"
      />
      <button onClick={detectMood}>Detect Mood</button>
    </div>
  );
};

export default FaceDetection;
