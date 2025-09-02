import React from 'react'
import { BookOpen, Tag, Cake, Puzzle } from "lucide-react";
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
const LocalGroups = () => {
  return (
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
              <div className="font-medium text-gray-900">{value?.name}</div>
              <div className="text-sm text-gray-500 ">
                {value?.members} members
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LocalGroups
