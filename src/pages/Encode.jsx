import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

export default function Encode() {
  const [file, setFile] = useState(null);
  const [secretText, setSecretText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'audio/*': ['.wav', '.mp3'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
      toast.success('File uploaded!');
    },
  });

  const handleEncode = () => {
    if (!file || !secretText) {
      toast.error('Please upload a file and enter secret text');
      return;
    }
    setIsProcessing(true);
    // TODO: Add LSB encoding logic here
    setTimeout(() => {
      setIsProcessing(false);
      toast.success('Secret text embedded successfully!');
      // TODO: Generate download link for stego file
    }, 1500);
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Hide Secret Text</h1>
      
      {/* File Upload */}
      <div 
        {...getRootProps()} 
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 mb-6"
      >
        <input {...getInputProps()} />
        <p>Drag & drop an image/audio file here, or click to select</p>
        {file && (
          <p className="mt-2 text-sm text-gray-600">
            Selected: <span className="font-medium">{file.name}</span>
          </p>
        )}
      </div>

      {/* Secret Text Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Secret Message</label>
        <textarea
          value={secretText}
          onChange={(e) => setSecretText(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="Enter text to hide..."
        />
      </div>

      {/* Encode Button */}
      <button
        onClick={handleEncode}
        disabled={isProcessing}
        className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
          isProcessing ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isProcessing ? 'Encoding...' : 'Hide Text in File'}
      </button>
    </div>
  );
}