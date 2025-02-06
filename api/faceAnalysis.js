import * as faceapi from "./face-api.min.js"; // Adjusted path for the correct location

export const loadModels = async () => {
  const modelPath = "/models"; // Path to your models folder
  await faceapi.nets.ssdMobilenetv1.loadFromUri(modelPath);
  await faceapi.nets.faceExpressionNet.loadFromUri(modelPath);
};

export const runFaceAnalysis = async (canvas) => {
  const detections = await faceapi.detectAllFaces(canvas).withFaceExpressions();
  return detections.map((d) => ({
    expressions: d.expressions,
    position: d.alignedRect.box,
  }));
};
