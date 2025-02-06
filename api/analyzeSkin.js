import * as faceapi from "../js/face-api.min.js";

export const loadModels = async () => {
  const modelPath = "/models/"; // Path to your models folder
  await faceapi.nets.ssdMobilenetv1.loadFromUri(modelPath);
  await faceapi.nets.faceLandmark68Net.loadFromUri(modelPath);
  await faceapi.nets.faceExpressionNet.loadFromUri(modelPath);
};
