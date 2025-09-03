import React from "react";

import DailyNews from "./DailyNews";
import UpcomingEvent from "./UpcomingEvent";
import Post from "./Post";
import SearchPeople from "./SearchPeople";
import DailyStreak from "./DailyStreak";
import LocalGroups from "./LocalGroups";
import MatchingSection from "./MatchingSection";

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
          <MatchingSection />
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
