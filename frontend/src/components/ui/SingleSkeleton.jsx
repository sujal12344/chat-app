import React from "react";

const SingleSkeleton = () => {
  return (
    <>
    <div className="flex items-center space-x-4">
      <div className="animate-pulse scale-90 md:scale-100 h-12 w-12 rounded-full bg-sky-300 opacity-20"></div>
      <div className="space-y-2">
        <div className="animate-pulse rounded-md h-4 w-[100px] md:w-[180px] bg-sky-300 opacity-20"></div>
        <div className="animate-pulse rounded-md h-4 w-[75px] md:w-[120px] bg-sky-300 opacity-20"></div>
      </div>
    </div>
    <div className="flex items-center space-x-4 rotate-180">
      <div className="animate-pulse scale-90 md:scale-100 h-12 w-12 rounded-full bg-sky-300 opacity-20"></div>
      <div className="space-y-2">
        <div className="animate-pulse rounded-md h-4 w-[75px] md:w-[120px] bg-sky-300 opacity-20"></div>
        <div className="animate-pulse rounded-md h-4 w-[100px] md:w-[180px] bg-sky-300 opacity-20"></div>
      </div>
    </div>
    </>
  );
};

export default SingleSkeleton;
