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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secret Message
              <span className="ml-1 text-xs text-gray-500">
                ({secretText.length} characters)
              </span>
            </label>
            <textarea
              value={secretText}
              onChange={(e) => setSecretText(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              placeholder="Enter the text you want to hide..."
              maxLength="1000"
            />
          </div>

          <button
            onClick={handleEncode}
            disabled={isProcessing}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors duration-200 ${
              isProcessing 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            } flex items-center justify-center`}
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Hiding Message...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Hide Text in Image
              </>
            )}
          </button>
        </>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}