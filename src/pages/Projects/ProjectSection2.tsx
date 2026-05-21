import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import BaseSection from "@/layout/BaseSection";
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
import ProjectSingleCard from "./ProjectSingleCard";
import FeaturedCardSkeleton from "@/components/Modules/Projects/FeaturedCardSkeleton";
import PaginationModule from "@/components/Modules/Gallery/PaginationModule";
import Copy from "@/components/copy/Copy";

const PAGE_LIMIT = 10;

const ProjectsSection2 = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedType, setSelectedType] = useState<ProjectType | "ALL">(
    (searchParams.get("type") as ProjectType) || "ALL"
  );
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | "ALL">(
    (searchParams.get("status") as ProjectStatus) || "ALL"
  );
  const [selectedWorkType, setSelectedWorkType] = useState<TypeOfWork | "ALL">(
    (searchParams.get("workType") as TypeOfWork) || "ALL"
  );
  const [selectedYear, setSelectedYear] = useState<string>(
    searchParams.get("year") || "ALL"
  );
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState<number>(
    parseInt(searchParams.get("page") || "1")
  );

  // Update URL whenever filters change
  const updateUrlParams = (
    type: ProjectType | "ALL",
    status: ProjectStatus | "ALL",
    workType: TypeOfWork | "ALL",
    year: string,
    currentPage: number
  ) => {
    const params = new URLSearchParams();

    if (type !== "ALL") params.set("type", type);
    if (status !== "ALL") params.set("status", status);
    if (workType !== "ALL") params.set("workType", workType);
    if (year !== "ALL") params.set("year", year);
    if (currentPage > 1) params.set("page", currentPage.toString());

    setSearchParams(params);
  };

  // Handle Type Filter Change
  const handleTypeChange = (value: ProjectType | "ALL") => {
    setSelectedType(value);
    setSelectedStatus("ALL");
    setSelectedWorkType("ALL");
    setSelectedYear("ALL");
    setPage(1);
    updateUrlParams(value, "ALL", "ALL", "ALL", 1);
  };

  // Handle Status Filter Change
  const handleStatusChange = (value: ProjectStatus | "ALL") => {
    setSelectedStatus(value);
    setPage(1);
    updateUrlParams(selectedType, value, selectedWorkType, selectedYear, 1);
  };

  // Handle Work Type Filter Change
  const handleWorkTypeChange = (value: TypeOfWork | "ALL") => {
    setSelectedWorkType(value);
    setPage(1);
    updateUrlParams(selectedType, selectedStatus, value, selectedYear, 1);
  };

  // Handle Year Filter Change
  const handleYearChange = (value: string) => {
    setSelectedYear(value);
    setPage(1);
    updateUrlParams(selectedType, selectedStatus, selectedWorkType, value, 1);
  };

  // Sync state with URL params when submenu is clicked
  useEffect(() => {
    const urlType = searchParams.get("type") as ProjectType | null;
    const urlStatus = searchParams.get("status") as ProjectStatus | null;
    const urlWorkType = searchParams.get("workType") as TypeOfWork | null;
    const urlYear = searchParams.get("year");
    const urlPage = searchParams.get("page");

    setSelectedType(urlType || "ALL");
    setSelectedStatus(urlStatus || "ALL");
    setSelectedWorkType(urlWorkType || "ALL");
    setSelectedYear(urlYear || "ALL");
    setPage(parseInt(urlPage || "1"));
  }, [searchParams]);

  // Update page in URL when it changes
  const handlePageChange = (value: React.SetStateAction<number>) => {
    const newPage = typeof value === "function" ? value(page) : value;
    setPage(newPage);
    updateUrlParams(selectedType, selectedStatus, selectedWorkType, selectedYear, newPage);
  };

  // Build query params based on filters
  const queryParams = {
    ...(selectedType !== "ALL" && { type: selectedType }),
    ...(selectedStatus !== "ALL" && { status: selectedStatus }),
    ...(selectedWorkType !== "ALL" && { typeofWork: selectedWorkType }),
    ...(selectedYear !== "ALL" && { year: selectedYear }),
    isPublic: true,
    page,
    limit: PAGE_LIMIT,
  };

  const { data: projectData, isLoading } = useAllProjectsQuery(queryParams);

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
    setPage(1);
    updateUrlParams("ALL", "ALL", "ALL", "ALL", 1);
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
    "LANDSCAPE"
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
    "CONSULTANCY",
  ];

  const years = [
    "ALL",
    ...Array.from({ length: 9 }, (_, i) => (2022 + i).toString()),
  ];

  return (
    <BaseSection>
      {/* Filter Section */}
      <div className="mb-8 space-y-4 -mt-30 md:-mt-40">
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
                  (selectedYear !== "ALL" ? 1 : 0)}
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
              onValueChange={handleTypeChange}
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
              onValueChange={handleWorkTypeChange}
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
              onValueChange={handleStatusChange}
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

          {/* Year Filter */}
          <div className="w-full md:w-auto">
            <Select
              value={selectedYear}
              onValueChange={handleYearChange}
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
            {selectedYear !== "ALL" && (
              <Badge variant="secondary" className="gap-1">
                Year: {selectedYear}
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Loading State */}
      {isLoading && <FeaturedCardSkeleton />}

      {/* Projects Grid */}
      {!isLoading && projectData?.data && (
        <>
          {projectData.data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:gap-30 gap-5">
              {projectData.data.map((project, idx) => (
                <ProjectSingleCard
                  key={project._id}
                  project={project}
                  index={idx}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
              <Filter className="w-12 h-12 text-muted-foreground mb-4" />
              <Copy>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  No projects found
                </h3>
              </Copy>
              <Copy>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters to see more results
                </p>
              </Copy>
              {hasActiveFilters && (
                <Button variant="outline" onClick={handleResetFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </>
      )}

      <div className="pt-10 mb-15">
        {totalPages > 1 && (
          <PaginationModule
            page={page}
            totalPages={totalPages}
            pageNumbers={pageNumbers}
            setPage={handlePageChange}
          />
        )}
      </div>
    </BaseSection>
  );
};

export default ProjectsSection2;
