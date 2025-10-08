"use client";
import { dailyNews } from "@/utils/api";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegNewspaper } from "react-icons/fa6";
import ComponentLoader from "../loader/ComponentLoader";


const DailyNews = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchDailyNews();
  }, []);
  const nodesc =
    "No detailed description available for this article. Click 'Read more' to learn about the latest developments.";
  async function fetchDailyNews() {
    try {
      setLoading(true);
      const data = await dailyNews();
      console.log("daily news data", data?.results);
      setNewsData(data?.results);
    } catch (err) {
      console.log(err);
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  }
  if (loading || !newsData) {
    return <ComponentLoader LoadingText={'Loading Daily News...'}/>;
  }
  return (
    <div className="bg-white rounded-lg p-4  text-2xl font-semibold ">
      <div className=" mb-12 flex justify-center items-center gap-4">
        <p className="text-slate-600">Daily News</p>
        <FaRegNewspaper className="text-blue-600" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 justify-center items-center gap-4">
        {newsData &&
          newsData.map((news, index) => (
            <div
              key={index}
              className="flex flex-col bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-blue-300 h-80 w-full  transtiion duration-300 hover:scale-105  "
            >
              <Image
                className="w-full object-cover h-1/3 "
                width={200}
                height={200}
                alt="news img"
                src={news?.image_url || "/img/newspaper.png"}
              />
              <div className="p-4 flex flex-col flex-grow">
                <div className="">
                  <h2 className=" font-semibold text-lg mb-1 line-clamp-2 ">
                    {news.title}
                  </h2>
                </div>
                <p className=" text-sm text-gray-600 line-clamp-4">
                  {news?.description || nodesc}
                </p>
              </div>
              <div className="flex justify-end p-4 ">
                <Link
                  href={news.link}
                  className="text-blue-400 text-sm cursor-pointer"
                >
                  Read More
                </Link>
              </div>
            </div>
            
          ))}
      </div>
    </div>
  );
};

export default DailyNews;
