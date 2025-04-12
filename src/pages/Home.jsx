// Home.jsx
import { useState } from 'react';
import Encode from './Encode';
import Decode from './Decode';

// Main homepage containing tabs for Encode and Decode functionality
export default function Home() {
  const [activeTab, setActiveTab] = useState('encode');
  
   // Top hero/banner section
  const HeroSection = () => (
    <div className="text-center py-10">
      <h1 className="text-4xl font-extrabold text-gray-800 ">🔐 HiddenPixels</h1>
      <p className="text-lg text-gray-500  max-w-xl mx-auto">
        A web-based steganography tool to hide and extract secret text from images using LSB encoding.
      </p>
    </div>
  );

  return (
    <div className="bg-gray-50 mb-auto">

      <HeroSection />
      {/* Tabs for switching between Encode and Decode */}
      <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white  rounded-2xl shadow-xl overflow-hidden">
          <div className="flex border-b ">
          {/* Encode Tab Button */}
            <button
              className={`flex-1 py-5 px-6 text-center font-semibold transition-all duration-300 ease-in-out ${
                activeTab === 'encode' 
                  ? 'text-white bg-gradient-to-br from-blue-600 to-purple-600' 
                  : 'text-gray-500 hover:bg-gray-50 '
              }`}
              onClick={() => setActiveTab('encode')}
            >
              Hide Message
            </button>
            {/* Decode Tab Button */}
            <button
              className={`flex-1 py-5 px-6 text-center font-semibold transition-all duration-300 ease-in-out ${
                activeTab === 'decode' 
                  ? 'text-white bg-gradient-to-br from-purple-600 to-blue-600' 
                  : 'text-gray-500 hover:bg-gray-50 '
              }`}
              onClick={() => setActiveTab('decode')}
            >
              Extract Message
            </button>
          </div>
          
          {/* Tab Content */}
          <div className="p-6 sm:p-8">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-800 ">
                {activeTab === 'encode' ? '🕵️‍♂️ Hide Secret Text' : '🔍 Extract Hidden Text'}
              </h2>
              <p className="text-gray-600  max-w-md mx-auto">
                {activeTab === 'encode' 
                  ? 'Securely embed messages within image pixels'
                  : 'Discover hidden content in your images'}
              </p>
            </div>
            {/* Conditional render based on tab */}
            {activeTab === 'encode' ? <Encode /> : <Decode />}
          </div>
        </div>
      </div>
    </div>
  );
}
