// src/Lib/lib.js
// Core class for LSB steganography logic
export class Steganographer {
    // Encodes text into the image's RGB pixel data using LSB
  static encodeTextInImage(canvas, text) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Convert text to binary and prepend 32-bit length header
    const binaryText = this.textToBinary(text);
    const binaryLength = text.length.toString(2).padStart(32, '0');
    const fullBinary = binaryLength + binaryText;
    
    if (fullBinary.length > data.length * 3) { // 3 bits per pixel (RGB)
      throw new Error('Message too large for image');
    }
      
      // Embed bits into RGB channels
    let bitIndex = 0;
    for (let i = 0; i < data.length && bitIndex < fullBinary.length; i += 4) {
      for (let channel = 0; channel < 3; channel++) { // RGB channels
        if (bitIndex < fullBinary.length) {
          // Replace LSB with our bit
          data[i + channel] = (data[i + channel] & 0xFE) | parseInt(fullBinary[bitIndex], 10);
          bitIndex++;
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas;
  }
  
  // Decodes and extracts text from LSB of image pixels
  static decodeTextFromImage(canvas) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Extract 32-bit length header first
    let bitIndex = 0;
    let lengthBits = '';
    let messageBits = '';
    
    // Read 32-bit length header
    while (bitIndex < 32 && bitIndex < data.length * 3) {
      const pixelIndex = Math.floor(bitIndex / 3) * 4;
      const channel = bitIndex % 3;
      lengthBits += (data[pixelIndex + channel] & 1).toString();
      bitIndex++;
    }
    
    const length = parseInt(lengthBits, 2);
    if (isNaN(length)) {
      throw new Error('Invalid message header');
    }
    
    // Read actual message bits
    while (messageBits.length < length * 8 && bitIndex < data.length * 3) {
      const pixelIndex = Math.floor(bitIndex / 3) * 4;
      const channel = bitIndex % 3;
      messageBits += (data[pixelIndex + channel] & 1).toString();
      bitIndex++;
    }
    
    return this.binaryToText(messageBits);
  }
  
  // Convert text to binary
  static textToBinary(text) {
    return Array.from(text)
      .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join('');
  }
  
  // Convert binary to text
  static binaryToText(binary) {
    return binary.match(/.{1,8}/g)
      .map(byte => String.fromCharCode(parseInt(byte, 2)))
      .join('');
  }
}