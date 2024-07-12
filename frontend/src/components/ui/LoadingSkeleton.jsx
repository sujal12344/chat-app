import React from "react";
import SingleSkeleton from "./SingleSkeleton";

const LoadingSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 h-full">
      <SingleSkeleton />
      <SingleSkeleton />
      <SingleSkeleton />
    </div>
  );
};

export default LoadingSkeleton;
