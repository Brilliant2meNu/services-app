import * as faceapi from "https://cdn.jsdelivr.net/npm/face-api.js";

export const loadModels = async () => {
  const modelPath = "/models/"; // Path to your models folder
  await faceapi.nets.ssdMobilenetv1.loadFromUri(modelPath);
  await faceapi.nets.faceLandmark68Net.loadFromUri(modelPath);
  await faceapi.nets.faceExpressionNet.loadFromUri(modelPath);
};
