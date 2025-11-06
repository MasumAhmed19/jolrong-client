import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

interface DashboardProjectSkeletonProps {
  rows?: number;
}

const DashboardProjectSkeleton: React.FC<DashboardProjectSkeletonProps> = ({ rows = 5 }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="pl-4">ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rows }).map((_, idx) => (
          <TableRow key={idx} className="odd:bg-muted/50 animate-pulse">
            <TableCell className="pl-4">
              <div className="h-4 w-4 bg-gray-200 rounded" />
            </TableCell>
            <TableCell>
              <div className="h-4 w-32 bg-gray-200 rounded" />
            </TableCell>
            <TableCell>
              <div className="h-4 w-20 bg-gray-200 rounded" />
            </TableCell>
            <TableCell>
              <div className="h-4 w-20 bg-gray-200 rounded" />
            </TableCell>
            <TableCell className="flex gap-2">
              <div className="h-6 w-6 bg-gray-200 rounded-full" />
              <div className="h-6 w-6 bg-gray-200 rounded-full" />
              <div className="h-6 w-6 bg-gray-200 rounded-full" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DashboardProjectSkeleton;
