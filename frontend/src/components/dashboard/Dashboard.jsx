import React from "react";

import DailyNews from "./DailyNews";
import UpcomingEvent from "./UpcomingEvent";
import Post from "./Post";
import SearchPeople from "./SearchPeople";
import DailyStreak from "./DailyStreak";
import LocalGroups from "./LocalGroups";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-3 ">
        {/* left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* search */}
          <SearchPeople />
          {/* post creation */}
          <Post />

          {/* matching section */}
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
          {/* daily news*/}
          <DailyNews />
        </div>
        {/* right section */}
        <div className="space-y-6">
          {/* daily streak */}
          <DailyStreak />
          {/* local groups */}
          <LocalGroups />
          {/* upcoming event*/}

          <UpcomingEvent />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
