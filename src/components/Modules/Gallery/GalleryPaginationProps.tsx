import { Button } from "@/components/ui/button";

interface GalleryPaginationProps {
  page: number;
  totalPages: number;
  pageNumbers: number[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const GalleryPagination = ({
  page,
  totalPages,
  pageNumbers,
  setPage,
}: GalleryPaginationProps) => (
  <div className="flex items-center justify-center gap-2 mt-8">
    <Button
      size="sm"
      variant="ghost"
      onClick={() => setPage((p) => Math.max(1, p - 1))}
      disabled={page <= 1}
    >
      Prev
    </Button>

    {pageNumbers[0] > 1 && (
      <>
        <Button
          size="sm"
          variant={page === 1 ? "secondary" : "ghost"}
          onClick={() => setPage(1)}
        >
          1
        </Button>
        {pageNumbers[0] > 2 && <span className="px-2">…</span>}
      </>
    )}

    {pageNumbers.map((p) => (
      <Button
        key={p}
        size="sm"
        variant={p === page ? "secondary" : "ghost"}
        onClick={() => setPage(p)}
      >
        {p}
      </Button>
    ))}

    {pageNumbers[pageNumbers.length - 1] < totalPages && (
      <>
        {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
          <span className="px-2">…</span>
        )}
        <Button
          size="sm"
          variant={page === totalPages ? "secondary" : "ghost"}
          onClick={() => setPage(totalPages)}
        >
          {totalPages}
        </Button>
      </>
    )}

    <Button
      size="sm"
      variant="ghost"
      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
      disabled={page >= totalPages}
    >
      Next
    </Button>
  </div>
);

export default GalleryPagination;
