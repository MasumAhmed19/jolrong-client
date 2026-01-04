import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useParams } from "react-router";
import { useProjectBySlugQuery } from "@/redux/api/projects/projects.api";
import SingleProjectSkeleton from "@/components/Modules/Projects/SingleProjectSkeleton";
import { MediaModal } from "@/components/Animated/MediaModal/MediaModal";
import Copy from "@/components/copy/Copy";
import { motion } from "framer-motion";
import { containerVariants, imageVariants } from "@/types";
import RelatedProjects from "./RelatedProjects";
import InfoRow from "@/components/Modules/Projects/InfoRow";

const SingleProject = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: singleProject, isLoading } = useProjectBySlugQuery(
    slug as string
  );
  const project = singleProject?.data;

  if (isLoading) {
    return <SingleProjectSkeleton />;
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Project not found
      </div>
    );
  }

  const {
    name,
    client,
    location,
    size,
    type,
    status,
    description,
    image,
    year,
    gallery,
    typeofWork,
  } = project;

  return (
    <div className="min-h-screen flex flex-col mt-20">
      {/* Hero Section */}
      <div className="relative w-full h-[70vh] rounded-xl overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-5">
          <Copy>
            <h1 className="text-white text-3xl md:text-5xl shadow-2xl font-bold tracking-wide">
              {name}
            </h1>
          </Copy>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="mx-auto w-full py-4 pt-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="hover:text-primary">
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/projects" className="hover:text-primary">
                  Projects
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage className="text-[#3f3f3f]">{name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* About Project */}
      <div className="mx-auto w-full py-12">
        <Copy>
          <h2 className="text-2xl font-semibold uppercase text-gray-900 mb-8">
            Project Details
          </h2>
        </Copy>
        <div className="grid grid-cols-1 gap-10 ">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-8 lg:gap-16 items-start">
            {/* Left Section - Project Information */}
            <div>
              <div className="space-y-1">
                <InfoRow label="Name:" value={name} />
                <InfoRow label="Client: " value={client} />
                <InfoRow label="Project Type:" value={type} />
                <InfoRow
                  label="Type of work:"
                  value={
                    Array.isArray(typeofWork)
                      ? typeofWork
                          .map((work) => work.charAt(0) + work.slice(1).toLowerCase())
                          .join(", ")
                      : typeofWork
                  }
                />
                <InfoRow label="Location:" value={location} />
                <InfoRow label="Size:" value={size} />
                <InfoRow label="Status:" value={status} />
                <InfoRow label="Year" value={year} />
              </div>
            </div>

            {/* Right Section - Building Image */}
            <div
              className="w-full h-full bg-red-400 bg-center bg-no-repeat rounded-sm"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
              }}
            ></div>
          </div>

          {/* Right Column - Description */}

          {description && (
            <div className="text-[#3f3f3f] py-[40px]">
              <Copy>
                <h2 className="text-2xl font-semibold uppercase text-gray-900 mb-8">
                  Project Description
                </h2>
              </Copy>
              <Copy>
              <p className="text-lg leading-relaxed">{description}</p>
              </Copy>
            </div>
          )}
        </div>
      </div>

      {/* Gallery */}
      {gallery && gallery.length > 0 && (
        <div className="mx-auto w-full py-12">
          <Copy>
            <h2 className="text-2xl font-semibold uppercase text-gray-900 mb-8">
              Project Gallery
            </h2>
          </Copy>
          <motion.div
            className="columns-1 sm:columns-2 md:columns-4 gap-5 rounded-md overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {gallery.map((img, i) => (
              <motion.div
                key={i}
                variants={imageVariants}
                className="mb-5 break-inside-avoid"
              >
                <MediaModal imgSrc={img} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* <SliderGallery gallery={gallery ?? []} showNumbers={false} /> */}
      <RelatedProjects />
    </div>
  );
};

export default SingleProject;
