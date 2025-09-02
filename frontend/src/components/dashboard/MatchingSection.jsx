import React from 'react'

const MatchingSection = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 text-center">
      <div className="mb-4 ">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mx-auto flex items-center justify-center ">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-gradient-to-br from-orange-400 to-red-500 rounded-full" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Matching based on your personality
        </h3>
        <p className="text-gray-600 mb-6">
          Find new connections that match your unique traits.
        </p>
        <button className="w-1/2  py-3  bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium">
          Start Matching
        </button>
      </div>
    </div>
  );
}

export default MatchingSection
