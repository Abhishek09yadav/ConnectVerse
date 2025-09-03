"use client";
import { dailyNews } from "@/utils/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const DailyNews = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchDailyNews();
  }, []);
  const router = useRouter();
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
    return <>Loading News...</>;
  }
  return (
    <div className="bg-white rounded-lg p-4 ">
      <div className="grid grid-cols-2 md:grid-cols-3 justify-center items-center gap-4">
        {newsData &&
          newsData.map((news, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-blue-300 h-48 w-full transtiion duration-300 hover:scale-105 cursor-pointer"
            >
              <Image
                className="w-full"
                width={200}
                height={200}
                src={news.image_url || "/img/newspaper.png"}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default DailyNews;
