import React from 'react'
import {

  Flame,
 
} from "lucide-react";
const DailyStreak = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Daily Streak
        </h3>
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Flame className="w-8 h-8 text-orange-500" />
          <span className="text-3xl font-bold text-gray-900">1</span>
        </div>
        <p className="text-sm text-gray-600">
          Streak updates automatically when you log in daily.
        </p>
      </div>
    </div>
  );
}

export default DailyStreak
