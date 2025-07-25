import React, { useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';

const FaceDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
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

    setInterval(async () => {
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
        // console.log(detections[0].expressions);
    }, 200);
  };

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
      
    </div>
  );
};

export default FaceDetection;
