import { useState, useRef } from 'react'; 
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { Steganographer } from '../Lib/lib';
import { fileToDataURL, createImageElement } from '../Lib/utils';

export default function Decode() {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {'image/*': ['.png', '.jpg', '.jpeg', '.webp']},
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      if (!acceptedFiles.length) return;
      setFile(acceptedFiles[0]);
      setExtractedText('');
      toast.success('File uploaded!');
    },
  });

  const handleRemoveFile = () => {
    setFile(null);
    setExtractedText('');
    toast.info('File removed');
  };

  const handleDecode = async () => {
    if (!file) {
      toast.error('Please upload a file first');
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
      
      const text = Steganographer.decodeTextFromImage(canvas);
      setExtractedText(text);
      
      toast.success('Secret text extracted!');
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      setExtractedText('');
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

          <button
            onClick={handleDecode}
            disabled={isProcessing || !file}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors duration-200 ${
              isProcessing 
                ? 'bg-purple-400 cursor-not-allowed' 
                : 'bg-purple-600 hover:bg-purple-700'
            } flex items-center justify-center`}
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Decoding...
              </>
            ) : (
              'Extract Hidden Text'
            )}
          </button>

          {extractedText && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium">Hidden Message</label>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(extractedText);
                    toast.success('Copied to clipboard!');
                  }}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  Copy
                </button>
              </div>
              <div className="p-3 bg-white rounded-lg border font-mono whitespace-pre-wrap">
                {extractedText}
              </div>
            </div>
          )}
        </>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}