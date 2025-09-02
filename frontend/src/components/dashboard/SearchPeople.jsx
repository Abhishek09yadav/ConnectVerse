import React from 'react'
import {
  Search,

} from "lucide-react";
const SearchPeople = () => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2  w-5 h-5 text-gray-400" />
      <input
        className="w-full pl-10 pr-4 py-3 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
        placeholder="Search for people, groups, or topics..."
      />
    </div>
  );
}

export default SearchPeople
