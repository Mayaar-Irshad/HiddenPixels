// src/Lib/lib.js
export class Steganographer {
  static encodeTextInImage(canvas, text) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Add termination marker
    text += '\0';
    const textBits = this.textToBits(text);
    
    if (textBits.length > data.length * 4 / 8) {
      throw new Error('Message too large for image');
    }

    for (let i = 0; i < textBits.length; i++) {
      // Modify LSB of each color channel
      const bytePos = Math.floor(i / 8);
      const bitPos = i % 8;
      const mask = 1 << bitPos;
      const bit = (text.charCodeAt(bytePos) & mask) >> bitPos;
      
      const pixelPos = i * 4;
      data[pixelPos] = (data[pixelPos] & 0xFE) | bit;
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas;
  }

  static decodeTextFromImage(canvas) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let result = '';
    let byte = 0;

    for (let i = 0; i < data.length; i += 4) {
      // Extract LSB from each color channel
      const bit = data[i] & 1;
      byte = (byte << 1) | bit;
      
      if (i > 0 && (i / 4 + 1) % 8 === 0) {
        if (byte === 0) break; // Null terminator
        result += String.fromCharCode(byte);
        byte = 0;
      }
    }

    return result;
  }

  static textToBits(text) {
    return Array.from(text).flatMap(char => {
      const bits = [];
      for (let i = 0; i < 8; i++) {
        bits.push((char.charCodeAt(0) >> i) & 1);
      }
      return bits;
    });
  }
}