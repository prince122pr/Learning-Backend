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

    const detectMood = async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

        if(!detections || detections.length === 0){
            console.log('No face detection');
            return;
        }

        if (detections.length > 0) {
  const expressions = detections[0].expressions; // expressions object
  const sorted = Object.entries(expressions).sort((a, b) => b[1] - a[1]);
  const topExpression = sorted[0][0]; // highest score expression name


  console.log("Most likely expression: ", topExpression);
}

    };

  useEffect(() => {

    loadModels();
  }, []);


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
