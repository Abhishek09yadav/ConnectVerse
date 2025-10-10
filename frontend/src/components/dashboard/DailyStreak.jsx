"use client";
import React, { useEffect, useState } from "react";
import { Flame, Trophy } from "lucide-react";
import { getStreak, updateStreak } from "@/utils/api";
import toast from "react-hot-toast";
import ComponentLoader from "../loader/ComponentLoader";

const DailyStreak = () => {
  const [streakData, setStreakData] = useState({ streakCount: 0, maxStreak: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStreak();
  }, []);

  async function fetchStreak() {
    try {
      setLoading(true);
      await updateStreak();
      const data = await getStreak();
      console.log("streak data",data)
      setStreakData(data);
    } catch (error) {
      console.error("Error fetching streak:", error);
      toast.error("Failed to load streak data");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <ComponentLoader LoadingText="Loading Streak..." />;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Your Streaks
        </h3>
        <div className="flex justify-around items-center gap-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2 mb-2">
              <Flame className="w-8 h-8 text-orange-500" />
              <span className="text-3xl font-bold text-gray-900">
                {streakData?.streakCount}
              </span>
            </div>
            <p className="text-sm text-gray-600 font-medium">Daily Streak</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2 mb-2">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <span className="text-3xl font-bold text-gray-900">
                {streakData?.maxStreak}
              </span>
            </div>
            <p className="text-sm text-gray-600 font-medium">Best Streak</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          Streak updates automatically when you log in daily.
        </p>
      </div>
    </div>
  );
};

export default DailyStreak;
