import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

export default function Decode() {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
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

  const handleDecode = () => {
    if (!file) {
      toast.error('Please upload a file first');
      return;
    }
    setIsProcessing(true);
    // TODO: Add LSB decoding logic here
    setTimeout(() => {
      setIsProcessing(false);
      setExtractedText('This is a placeholder for extracted secret text.');
      toast.success('Secret text extracted!');
    }, 1500);
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Extract Secret Text</h1>
      
      {/* File Upload */}
      <div 
        {...getRootProps()} 
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 mb-6"
      >
        <input {...getInputProps()} />
        <p>Drag & drop an image/audio file with hidden text</p>
        {file && (
          <p className="mt-2 text-sm text-gray-600">
            Selected: <span className="font-medium">{file.name}</span>
          </p>
        )}
      </div>

      {/* Decode Button */}
      <button
        onClick={handleDecode}
        disabled={isProcessing}
        className={`w-full py-3 px-4 rounded-lg font-medium text-white mb-6 ${
          isProcessing ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'
        }`}
      >
        {isProcessing ? 'Decoding...' : 'Extract Text'}
      </button>

      {/* Extracted Text Output */}
      {extractedText && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <label className="block text-sm font-medium mb-2">Hidden Message</label>
          <div className="p-3 bg-white rounded-lg border">
            {extractedText}
          </div>
        </div>
      )}
    </div>
  );
}