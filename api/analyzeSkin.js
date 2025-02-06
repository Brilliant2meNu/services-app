
import { processFile } from "./fileHandler.js";
import { runFaceAnalysis } from "./faceAnalysis.js";
import { saveToDatabase } from "./saveToDatabase.js";

export const analyzeSkin = async () => {
  const fileInput = document.querySelector("input[type='file']");
  const file = fileInput.files[0];

  try {
    const canvas = await processFile(file); // Render image on canvas
    const analysis = await runFaceAnalysis(canvas); // Analyze the image
    console.log("Analysis Results:", analysis);

    const result = await saveToDatabase(analysis); // Save to database
    if (result) {
      alert("Skin analysis completed and saved successfully!");
    } else {
      alert("Skin analysis completed but not saved.");
    }
  } catch (error) {
    console.error("Error during analysis:", error);
    alert(`Error: ${error}`);
  }
};
