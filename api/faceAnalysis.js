import * as faceapi from "./face-api.min.js"; // Adjusted path for the correct location

export const runFaceAnalysis = async (canvas) => {
  await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
  await faceapi.nets.faceExpressionNet.loadFromUri("/models");

  const detections = await faceapi.detectAllFaces(canvas).withFaceExpressions();
  return detections.map((d) => ({
    expressions: d.expressions,
    position: d.alignedRect.box,
  }));
};
