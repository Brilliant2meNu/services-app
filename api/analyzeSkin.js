import * as faceapi from "../js/face-api.min.js";

export const loadModels = async () => {
  const modelPath = "/models/";
  try {
    await faceapi.nets.ssdMobilenetv1.loadFromUri(modelPath);
    await faceapi.nets.faceLandmark68Net.loadFromUri(modelPath);
    await faceapi.nets.faceExpressionNet.loadFromUri(modelPath);
    console.log("Models loaded successfully!");
  } catch (error) {
    console.error("Error loading models:", error);
  }
};

export const analyzeSkin = async () => {
  const fileInput = document.getElementById("upload");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please upload an image!");
    return;
  }

  try {
    const img = await faceapi.bufferToImage(file);
    const canvas = document.getElementById("canvas");
    const displaySize = { width: img.width, height: img.height };

    faceapi.matchDimensions(canvas, displaySize);

    const detections = await faceapi
      .detectAllFaces(img)
      .withFaceLandmarks()
      .withFaceExpressions();

    const resizedDetections = faceapi.resizeResults(detections, displaySize);

    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

    console.log("Analysis results:", detections);
    alert("Skin analysis completed!");
  } catch (error) {
    console.error("Error during analysis:", error);
    alert("Skin analysis failed. See console for details.");
  }
};
