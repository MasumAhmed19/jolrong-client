import { useMemo, useState } from "react";
import HeadSecitonv2 from "@/components/Modules/HeadSectionv2";
import ContainerWidth from "@/layout/ContainerWidth";
import { useAllCreativePostsQuery } from "@/redux/api/creative/creative.api";
import CreativeCard from "./CreativeCard";
import FeaturedCardSkeleton from "@/components/Modules/Projects/FeaturedCardSkeleton";
import PaginationModule from "@/components/Modules/Gallery/PaginationModule";
import Copy from "@/components/copy/Copy";
import { Filter } from "lucide-react";
import { Outlet } from "react-router";

const PAGE_LIMIT = 10;

const ArtAndCraft = () => {
  const [page, setPage] = useState<number>(1);

  const queryParams = {
    page,
    limit: PAGE_LIMIT,
  };

  const { data: creativeData, isLoading } = useAllCreativePostsQuery(queryParams);
  const meta = creativeData?.meta;
  const totalPages = meta?.totalPages ?? 1;

  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    const maxVisible = 7;
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }, [page, totalPages]);

  return (
    <ContainerWidth className="min-h-screen bg-white mb-60 md:mb-25 md:px-0 px-6">
      <div className="md:py-[40px] ">
        <HeadSecitonv2
          title="Art & Craft"
          description="Ready to transform your space? We'd love to hear about your project and discuss how 
              we can bring your architectural vision to life.."
        />
      </div>

      {isLoading && <FeaturedCardSkeleton />}

      {!isLoading && creativeData?.data && (
        <>
          {creativeData.data.length > 0 ? (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5 space-y-4">
              {creativeData.data.map((creative) => (
                <div key={creative._id} className="break-inside-avoid mb-5">
                  <CreativeCard creative={creative} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
              <Filter className="w-12 h-12 text-muted-foreground mb-4" />
              <Copy>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  No creative works found
                </h3>
              </Copy>
              <Copy>
                <p className="text-muted-foreground mb-4">
                  Check back later for new additions to our gallery.
                </p>
              </Copy>
            </div>
          )}
        </>
      )}

      {/* Pagination */}
      {!isLoading && creativeData?.data && creativeData.data.length > 0 && (
        <div className="pt-12 pb-40">
          <PaginationModule
            page={page}
            totalPages={totalPages}
            pageNumbers={pageNumbers}
            setPage={setPage}
          />
        </div>
      )}
      <Outlet />
    </ContainerWidth>
  );
};

export default ArtAndCraft;
