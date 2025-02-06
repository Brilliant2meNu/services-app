
import * as faceapi from "face-api.js";

export const runFaceAnalysis = async (canvas) => {
  // Load face-api.js models
  await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
  await faceapi.nets.faceExpressionNet.loadFromUri("/models");

  // Detect faces and their expressions
  const detections = await faceapi.detectAllFaces(canvas).withFaceExpressions();
  const analysis = detections.map(d => ({
    expressions: d.expressions,
    position: d.alignedRect.box
  }));

  return analysis;
};
