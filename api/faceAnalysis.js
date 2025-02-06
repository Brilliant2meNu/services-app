import * as faceapi from "../js/face-api.min.js";

export const runFaceAnalysis = async (canvas) => {
  await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
  await faceapi.nets.faceExpressionNet.loadFromUri("/models");

  const detections = await faceapi.detectAllFaces(canvas).withFaceExpressions();
  return detections.map(d => ({
    expressions: d.expressions,
    position: d.alignedRect.box,
  }));
};
