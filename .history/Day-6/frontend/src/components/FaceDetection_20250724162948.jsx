import React, { useRef, useEffect } from "react";
import * as faceapi from "face-api.js";

const FaceDetection = () => {
  const videoRef = useRef(null);
 

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

  const detectMood = async () => {
    if (!videoRef.current || videoRef.current.readyState !== 4) return;

    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();

    if (!detections || detections.length === 0) {
      console.log("No face detected");
      return;
    }

    const expressions = detections[0].expressions;
    const topExpression = Object.entries(expressions).sort((a, b) => b[1] - a[1])[0][0];

    console.log("Expression:", topExpression);
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
        playsInline
        className="face-video w-full max-w-lg mx-auto rounded-xl"
      />
      <button onClick={()=>}>Click</button>
    </div>
  );
};

export default FaceDetection;
