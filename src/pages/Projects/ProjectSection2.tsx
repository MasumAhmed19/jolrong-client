import { useState } from "react";
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
import type { ProjectStatus, ProjectType } from "@/types";
import ProjectSingleCard from "./ProjectSingleCard";
import FeaturedCardSkeleton from "@/components/Modules/Projects/FeaturedCardSkeleton";


const ProjectsSection2 = () => {
  const [selectedType, setSelectedType] = useState<ProjectType | "ALL">("ALL");
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | "ALL">("ALL");
  const [showFilters, setShowFilters] = useState(false);

  // Build query params based on filters
  const queryParams = {
    ...(selectedType !== "ALL" && { type: selectedType }),
    ...(selectedStatus !== "ALL" && { status: selectedStatus }),
  };

  const { data: projectData, isLoading } = useAllProjectsQuery(queryParams);

  const handleResetFilters = () => {
    setSelectedType("ALL");
    setSelectedStatus("ALL");
  };

  const hasActiveFilters = selectedType !== "ALL" || selectedStatus !== "ALL";

  const projectTypes: Array<ProjectType | "ALL"> = [
    "ALL",
    "EXTERIOR",
    "INTERIOR",
    "STRUCTURAL",
    "GRAPHICS",
  ];

  const projectStatuses: Array<ProjectStatus | "ALL"> = [
    "ALL",
    "DESIGN",
    "ONGOING",
    "VISUALIZATION",
    "COMPLETED",
    "ANIMATION",
  ];

  return (
    <BaseSection>
      {/* Filter Section */}
      <div className="mb-8 space-y-4 -mt-30 md:-mt-50">
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
              <Badge variant="destructive" className="ml-2 px-1.5 py-0.5 text-xs">
                {(selectedType !== "ALL" ? 1 : 0) + (selectedStatus !== "ALL" ? 1 : 0)}
              </Badge>
            )}
          </Button>
        </div>

        {/* Filter Controls */}
        <div
          className={`${
            showFilters ? "flex" : "hidden"
          } md:flex flex-col md:flex-row gap-4 items-start md:items-center`}
        >
          {/* Type Filter */}
          <div className="w-full md:w-auto">
            <Select
              value={selectedType}
              onValueChange={(value) => setSelectedType(value as ProjectType | "ALL")}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Project Type" />
              </SelectTrigger>
              <SelectContent>
                {projectTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type === "ALL" ? "All Types" : type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div className="w-full md:w-auto">
            <Select
              value={selectedStatus}
              onValueChange={(value) => setSelectedStatus(value as ProjectStatus | "ALL")}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Project Status" />
              </SelectTrigger>
              <SelectContent>
                {projectStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status === "ALL" ? "All Status" : status}
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
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {selectedType !== "ALL" && (
              <Badge variant="secondary" className="gap-1">
                Type: {selectedType}
                {/* <X
                  className="w-3 h-3 cursor-pointer hover:text-destructive"
                  onClick={() => setSelectedType("ALL")}
                /> */}
              </Badge>
            )}
            {selectedStatus !== "ALL" && (
              <Badge variant="secondary" className="gap-1">
                Status: {selectedStatus}
                {/* <X
                  className="w-3 h-3 cursor-pointer hover:text-destructive"
                  onClick={() => setSelectedStatus("ALL")}
                /> */}
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <FeaturedCardSkeleton />
      )}

      {/* Projects Grid */}
      {!isLoading && projectData?.data && (
        <>
          {projectData.data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:gap-30 gap-5 ">
              {projectData.data.map((project, idx) => (
                <ProjectSingleCard key={project._id} project={project} index={idx} />
              ))}
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
    </BaseSection>
  );
};

export default ProjectsSection2;