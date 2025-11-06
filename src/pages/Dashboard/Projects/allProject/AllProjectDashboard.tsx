import { useMemo, useState } from "react";
import { useAllProjectsQuery } from "@/redux/api/projects/projects.api";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ProjectStatus, ProjectType, TypeOfWork } from "@/types";
import PaginationModule from "@/components/Modules/Gallery/PaginationModule";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProjectSingleRow from "./ProjectSingleRow";
import DashboardProjectSkeleton from "@/components/Modules/Projects/DashboardProjectSkeleton";

const PAGE_LIMIT = 15;

const AllProjectDashboard = () => {
  const [selectedType, setSelectedType] = useState<ProjectType | "ALL">("ALL");
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | "ALL">(
    "ALL"
  );
  const [selectedWorkType, setSelectedWorkType] = useState<TypeOfWork | "ALL">(
    "ALL"
  );
  const [selectedYear, setSelectedYear] = useState<string>("ALL"); 
  const [page, setPage] = useState<number>(1);
  const [showFilters, setShowFilters] = useState(false);

  const queryParams = {
    ...(selectedType !== "ALL" && { type: selectedType }),
    ...(selectedStatus !== "ALL" && { status: selectedStatus }),
    ...(selectedWorkType !== "ALL" && { typeofWork: selectedWorkType }),
    ...(selectedYear !== "ALL" && { year: selectedYear }), 
    page,
    limit: PAGE_LIMIT,
  };



  const { data: projectData, isLoading } = useAllProjectsQuery(queryParams);
  console.log(queryParams)
  const meta = projectData?.meta;
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

  const handleResetFilters = () => {
    setSelectedType("ALL");
    setSelectedStatus("ALL");
    setSelectedWorkType("ALL");
    setSelectedYear("ALL"); 
  };

  const hasActiveFilters =
    selectedType !== "ALL" ||
    selectedStatus !== "ALL" ||
    selectedWorkType !== "ALL" ||
    selectedYear !== "ALL"; 

  const projectTypes: Array<ProjectType | "ALL"> = [
    "ALL",
    "EXTERIOR",
    "INTERIOR",
    "STRUCTURAL",
    "GRAPHICS",
  ];

  const projectStatuses: Array<ProjectStatus | "ALL"> = [
    "ALL",
    "ONGOING",
    "COMPLETED",
    "UPCOMING",
  ];

  const typeofWork: Array<TypeOfWork | "ALL"> = [
    "ALL",
    "DESIGN",
    "VISUALIZATION",
    "ANIMATION",
    "CONSULTANT",
  ];

  const years = ["ALL", ...Array.from({ length: 9 }, (_, i) => (2022 + i).toString())];

  return (
    <section>
      {/* Filter Section */}
      <div className="mb-8 space-y-4">
        {/* Filter Toggle Button - Mobile */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {hasActiveFilters && (
              <Badge
                variant="destructive"
                className="ml-2 px-1.5 py-0.5 text-xs"
              >
                {(selectedType !== "ALL" ? 1 : 0) +
                  (selectedStatus !== "ALL" ? 1 : 0) +
                  (selectedWorkType !== "ALL" ? 1 : 0) +
                  (selectedYear !== "ALL" ? 1 : 0)} {/* ✅ NEW: Include year count */}
              </Badge>
            )}
          </Button>
        </div>

        {/* Filter Controls */}
        <div
          className={`${
            showFilters ? "flex" : "hidden"
          } md:flex flex-col md:flex-row gap-4 items-start md:items-center flex-wrap`}
        >
          {/* Type Filter */}
          <div className="w-full md:w-auto">
            <Select
              value={selectedType}
              onValueChange={(value) =>
                setSelectedType(value as ProjectType | "ALL")
              }
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Project Type" />
              </SelectTrigger>
              <SelectContent>
                {projectTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type === "ALL"
                      ? "All Types"
                      : type.charAt(0).toUpperCase() +
                        type.slice(1).toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Type of Work */}
          <div className="w-full md:w-auto">
            <Select
              value={selectedWorkType}
              onValueChange={(value) =>
                setSelectedWorkType(value as TypeOfWork | "ALL")
              }
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Type of work" />
              </SelectTrigger>
              <SelectContent>
                {typeofWork.map((work) => (
                  <SelectItem key={work} value={work}>
                    {work === "ALL"
                      ? "All Work Types"
                      : work.charAt(0).toUpperCase() +
                        work.slice(1).toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div className="w-full md:w-auto">
            <Select
              value={selectedStatus}
              onValueChange={(value) =>
                setSelectedStatus(value as ProjectStatus | "ALL")
              }
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Project Status" />
              </SelectTrigger>
              <SelectContent>
                {projectStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status === "ALL"
                      ? "All Status"
                      : status.charAt(0).toUpperCase() +
                        status.slice(1).toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* ✅ NEW: Year Filter */}
          <div className="w-full md:w-auto">
            <Select
              value={selectedYear}
              onValueChange={(value) => setSelectedYear(value)}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year === "ALL" ? "All Years" : year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetFilters}
              className="w-full md:w-auto cursor-pointer"
            >
              <X className="w-4 h-4 mr-2" />
              Reset Filters
            </Button>
          )}
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-muted-foreground">
              Active filters:
            </span>
            {selectedType !== "ALL" && (
              <Badge variant="secondary" className="gap-1">
                Type: {selectedType}
              </Badge>
            )}
            {selectedWorkType !== "ALL" && (
              <Badge variant="secondary" className="gap-1">
                Work: {selectedWorkType}
              </Badge>
            )}
            {selectedStatus !== "ALL" && (
              <Badge variant="secondary" className="gap-1">
                Status: {selectedStatus}
              </Badge>
            )}
            {/* ✅ NEW: Year badge */}
            {selectedYear !== "ALL" && (
              <Badge variant="secondary" className="gap-1">
                Year: {selectedYear}
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Loading State */}
      {isLoading && <DashboardProjectSkeleton rows={6} />}

      {/* Projects Table */}
      {!isLoading && projectData?.data && (
        <>
          {projectData.data.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-4">ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Type of Work</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Year</TableHead> 
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projectData.data.map((project, idx) => (
                    <ProjectSingleRow
                      key={project._id}
                      project={project}
                      index={idx}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
              <Filter className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">
                No projects found
              </h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters to see more results
              </p>
              {hasActiveFilters && (
                <Button variant="outline" onClick={handleResetFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </>
      )}

      <PaginationModule
        page={page}
        totalPages={totalPages}
        pageNumbers={pageNumbers}
        setPage={setPage}
      />
    </section>
  );
};

export default AllProjectDashboard;