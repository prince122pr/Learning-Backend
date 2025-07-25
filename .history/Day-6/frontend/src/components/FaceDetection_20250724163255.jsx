import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";

const FaceDetection = () => {
  const videoRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);

  const loadModels = async () => {
    const MODEL_URL = "/models";
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    ]);
    setModelsLoaded(true);
    startVideo();
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setVideoStarted(true);
          // 🔥 Optional: Warm up detection once
          warmupDetection();
        };
      })
      .catch((err) => console.error("Error accessing webcam:", err));
  };

  const warmupDetection = async () => {
    // Wait a bit to ensure video has a frame
    await new Promise((res) => setTimeout(res, 500));
    await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions());
  };

  const detectMood = async () => {
    if (!videoStarted || !videoRef.current || videoRef.current.readyState !== 4) {
      console.log("Video not ready");
      return;
    }

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
    console.log("Most likely expression:", topExpression);
  };

  useEffect(() => {
    loadModels();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full max-w-md rounded-xl shadow-md"
      />

      <button
        onClick={detectMood}
        disabled={!modelsLoaded || !videoStarted}
        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 disabled:opacity-50"
      >
        {modelsLoaded ? "Detect Mood" : "Loading..."}
      </button>
    </div>
  );
};

export default FaceDetection;
