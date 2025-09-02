import React from "react";
import {
  Search,
  ImageIcon,
  Layers,
  Pencil,
  Flame,
  BookOpen,
  Tag,
  Cake,
  Puzzle,
} from "lucide-react";
import DailyNews from "./DailyNews";
import UpcomingEvent from "./UpcomingEvent";
import Post from "./Post";
const groups = [
  {
    id: 1,
    name: "Book Club",
    members: "527",
    icon: BookOpen,
  },
  {
    id: 2,
    name: "Shopping Deals",
    members: "1,432",
    icon: Tag,
  },
  {
    id: 3,
    name: "Cooking Classes",
    members: "1,811",
    icon: Cake,
  },
  {
    id: 4,
    name: "Games",
    members: "350",
    icon: Puzzle,
  },
];
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-3 ">
        {/* left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2  w-5 h-5 text-gray-400" />
            <input
              className="w-full pl-10 pr-4 py-3 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Search for people, groups, or topics..."
            />
          </div>
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
          {/* local groups */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center ">
              Local groups in your area
            </h3>
            <div className="space-y-4">
              {groups.map((value, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-300 cursor-pointer"
                >
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <value.icon className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="">
                    <div className="font-medium text-gray-900">
                      {value?.name}
                    </div>
                    <div className="text-sm text-gray-500 ">
                      {value?.members} members
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* upcoming event*/}

          <UpcomingEvent />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
