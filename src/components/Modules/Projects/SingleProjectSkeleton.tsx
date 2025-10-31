import React from "react";

const shimmer = "animate-pulse bg-gray-200/50 dark:bg-gray-700/50";

const SingleProjectSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col mt-20">
      {/* Hero Section */}
      <div className="relative w-full h-[70vh] rounded-xl overflow-hidden">
        <div className={`w-full h-full ${shimmer}`} />
        <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
        </div>
      </div>

      {/* Breadcrumb Skeleton */}
      <div className="mx-auto w-full py-4 px-4 pt-10 flex items-center gap-2">
        <div className="h-4 w-12 bg-gray-200 rounded-md animate-pulse" />
        <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse" />
        <div className="h-4 w-20 bg-gray-200 rounded-md animate-pulse" />
        <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse" />
        <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse" />
      </div>

      {/* About Project Section */}
      <div className="mx-auto w-full py-12 px-4">
        <div className="h-8 w-60 bg-gray-200 rounded-md mb-8 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border p-5 rounded-md">
          {/* Left Column */}
          <div className="space-y-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between gap-5">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>

          {/* Right Column - Description */}
          <div>
            <div className="h-4 w-28 bg-gray-200 rounded-md mb-4 animate-pulse" />
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-3 w-full bg-gray-200 rounded-md animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Skeleton */}
      <div className="mx-auto w-full py-12 px-4">
        <div className="h-8 w-60 bg-gray-200 rounded-md mb-8 animate-pulse" />
        <div className="columns-1 sm:columns-2 md:columns-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="mb-8 break-inside-avoid">
              <div className="w-full h-64 bg-gray-200 rounded-lg animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProjectSkeleton;
