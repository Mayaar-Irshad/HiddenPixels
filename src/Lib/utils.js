// src/Lib/utils.js
// Converts a file to a base64 DataURL
export const fileToDataURL = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
};

// Creates an <img> element and resolves when loaded
export const createImageElement = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = src;
  });
};

// Triggers browser download of an image from a DataURL
export const downloadFile = (dataURL, filename) => {
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
