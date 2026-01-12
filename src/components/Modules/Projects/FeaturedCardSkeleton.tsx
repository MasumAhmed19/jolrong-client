import React from "react";

const FeaturedCardSkeleton: React.FC = () => {
  // Create an array of 6 placeholders
  const skeletons = Array(6).fill(null);

  return (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:gap-30 gap-5">
          {skeletons.map((_, idx) => (
            <div
              key={idx}
              className={`flex flex-col overflow-hidden rounded-md relative ${
                idx % 2 === 1 ? "md:top-[10vh]" : ""
              } animate-pulse`}
            >
              {/* Image skeleton */}
              <div className="relative overflow-hidden rounded-md bg-gray-200 h-[250px] w-full"></div>
    
              {/* Content skeleton */}
              <div className="p-4 flex flex-col md:flex-row items-end justify-between md:gap-5">
                <div className="w-full">
                  {/* Status */}
                  <div className="flex items-center gap-1 mb-2">
                    <div className="h-3 w-20 bg-gray-200 rounded"></div>
                  </div>
    
                  {/* Project name */}
                  <div className="h-4 w-40 bg-gray-300 rounded"></div>
                </div>
    
                {/* Year */}
                <div className="h-3 w-10 bg-gray-200 rounded mt-3 md:mt-0"></div>
              </div>
            </div>
          ))}
        </div>
      );
};

export default FeaturedCardSkeleton;
