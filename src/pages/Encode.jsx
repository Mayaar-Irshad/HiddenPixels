import { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { Steganographer } from '../Lib/lib';
import { fileToDataURL, createImageElement, downloadFile } from '../Lib/utils';

export default function Encode() {
  const [file, setFile] = useState(null);
  const [secretText, setSecretText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {'image/*': ['.png', '.jpg', '.jpeg']},
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      if (!acceptedFiles.length) return;
      setFile(acceptedFiles[0]);
      toast.success('File uploaded successfully!');
    },
  });

  const handleRemoveFile = () => {
    setFile(null);
    toast.info('File removed');
  };

  const handleEncode = async () => {
    if (!file || !secretText) {
      toast.error('Please upload a file and enter secret text');
      return;
    }

    setIsProcessing(true);
    
    try {
      const dataURL = await fileToDataURL(file);
      const img = await createImageElement(dataURL);
      
      const canvas = canvasRef.current;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      
      Steganographer.encodeTextInImage(canvas, secretText);
      
      const stegoDataURL = canvas.toDataURL('image/png');
      downloadFile(stegoDataURL, `stego-${file.name}`);
      
      toast.success('Message hidden successfully!');
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <div 
          {...getRootProps()} 
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 hover:border-blue-400 transition-colors duration-200"
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center space-y-2">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-gray-600">Drag & drop an image file here, or click to select</p>
            <p className="text-xs text-gray-400">Supports: PNG, JPG, JPEG</p>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-white p-4 rounded-lg border border-gray-200 relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Image Preview</label>
            <button
              onClick={handleRemoveFile}
              className="absolute top-2 right-2 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              title="Remove file"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img 
              src={URL.createObjectURL(file)} 
              alt="Preview" 
              className="max-h-64 w-auto mx-auto rounded-md shadow-sm"
            />
            <p className="mt-2 text-sm text-center text-gray-600">
              {file.name}
            </p>
          </div>

          {/* ... rest of the existing file preview and encode UI ... */}
        </>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}