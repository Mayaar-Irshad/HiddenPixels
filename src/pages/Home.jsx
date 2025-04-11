import { useState } from 'react';
import Encode from './Encode';
import Decode from './Decode';

export default function Home() {
  const [activeTab, setActiveTab] = useState('encode');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex border-b">
            <button
              className={`flex-1 py-5 px-6 text-center font-semibold transition-all duration-300 ${
                activeTab === 'encode' 
                  ? 'text-white bg-gradient-to-br from-blue-600 to-purple-600' 
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('encode')}
            >
              Hide Message
            </button>
            <button
              className={`flex-1 py-5 px-6 text-center font-semibold transition-all duration-300 ${
                activeTab === 'decode' 
                  ? 'text-white bg-gradient-to-br from-purple-600 to-blue-600' 
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('decode')}
            >
              Extract Message
            </button>
          </div>

          <div className="p-6 sm:p-8">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {activeTab === 'encode' ? '🕵️♂️ Hide Secret Text' : '🔍 Extract Hidden Text'}
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                {activeTab === 'encode' 
                  ? 'Securely embed messages within image pixels'
                  : 'Discover hidden content in your images'}
              </p>
            </div>
            {activeTab === 'encode' ? <Encode /> : <Decode />}
          </div>
        </div>
      </div>
    </div>
  );
}