import React from 'react'
import { GridLoader, ScaleLoader } from 'react-spinners';

const ComponentLoader = ({LoadingText="Loading..."}) => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center p-12">
      <GridLoader size={30} color="#0b9fd7" margin={2} />
      <p className='text-slate-600 '>{LoadingText}</p>
    </div>
  );
}

export default ComponentLoader
