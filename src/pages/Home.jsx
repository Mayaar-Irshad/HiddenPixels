import { useState } from 'react';
import Encode from './Encode';
import Decode from './Decode';

export default function Home() {
  const [activeTab, setActiveTab] = useState('encode');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b">
            <button
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
                activeTab === 'encode' 
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('encode')}
            >
              Hide Message
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
                activeTab === 'decode' 
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('decode')}
            >
              Extract Message
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {activeTab === 'encode' ? 'Hide Secret Text' : 'Extract Hidden Text'}
              </h2>
              <p className="text-gray-600">
                {activeTab === 'encode' 
                  ? 'Embed your secret message into an image'
                  : 'Retrieve hidden messages from images'}
              </p>
            </div>
            {activeTab === 'encode' ? <Encode /> : <Decode />}
          </div>
        </div>
      </div>
    </div>
  );
}