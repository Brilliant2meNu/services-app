import * as faceapi from "./face-api.min.js"; // Adjusted path for the correct location

export const loadModels = async () => {
  const modelPath = "/models/"; // Path to your models folder
  await faceapi.nets.ssdMobilenetv1.loadFromUri(modelPath);
  await faceapi.nets.faceLandmark68Net.loadFromUri(modelPath);
  await faceapi.nets.faceExpressionNet.loadFromUri(modelPath);
};

export const analyzeSkin = async () => {
  console.log("Starting skin analysis...");
  // Add any logic here for handling the analysis
};
