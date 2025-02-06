
export const processFile = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No file selected!");
      return;
    }

    const canvas = document.createElement("canvas");
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      resolve(canvas);
    };

    img.onerror = () => reject("Error loading image!");
  });
};
