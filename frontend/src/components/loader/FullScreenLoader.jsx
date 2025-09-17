import React from 'react'
import { HashLoader } from 'react-spinners';

const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center backdrop-blur-sm ">
      <HashLoader color="#4f46e5" size={80} />
    </div>
  );
}

export default FullScreenLoader
