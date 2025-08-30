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
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-3 ">
        {" "}
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
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 ">
              What's on your mind?
            </h3>
            <div className="mb-4">
              <textarea
                placeholder="Share a post, a photo, or an article..."
                rows={4}
                className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-transparent"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex space-x-4">
                <button className="flex items-center cursor-pointer space-x-2 px-3 py-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                  <ImageIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Photo</span>
                </button>
                <button className="flex items-center cursor-pointer space-x-2 px-3 py-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                  <Layers className="w-5 h-5" />
                  <span className="text-sm font-medium">Story</span>
                </button>
                <button className="flex items-center cursor-pointer space-x-2 px-3 py-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                  <Pencil className="w-5 h-5" />
                  <span className="text-sm font-medium">Article</span>
                </button>
                <button className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium cursor-pointer">
                  Post
                </button>
              </div>
            </div>
          </div>

          {/* matching section */}
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="mb-4">
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
              <button className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium">
                Start Matching
              </button>
            </div>
          </div>
        </div>

        {/* right section */}
        <div className="space-y-6">
          {/* daily streak */}
          <div className="bg-white rounded-xl shadow-sm space-y-6 p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 ">
                Daily Streak
              </h3>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
