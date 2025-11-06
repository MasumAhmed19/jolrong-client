import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Link, useParams } from "react-router";
import { SliderGallery } from "./SliderGallery";
import { useProjectBySlugQuery } from "@/redux/api/projects/projects.api";
import SingleProjectSkeleton from "@/components/Modules/Projects/SingleProjectSkeleton";

const SingleProject = () => {

  const { slug } = useParams<{ slug: string }>();

  const {data:singleProject, isLoading} =  useProjectBySlugQuery(slug as string)
  const project = singleProject?.data 

  if(isLoading){
    return(
      <SingleProjectSkeleton />
    )
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
  } = project;

  return (
    <div className="min-h-screen flex flex-col mt-20">
      {/* Hero Section */}
      <div className="relative w-full h-[70vh] rounded-xl overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-5">
          <h1 className="text-white text-3xl md:text-5xl shadow-2xl font-bold tracking-wide">
            {name}
          </h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="mx-auto w-full py-4 px-4 pt-10">
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
      <div className="mx-auto w-full py-12 px-4">
        <h2 className="text-2xl font-semibold uppercase text-gray-900 mb-8">Project Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border  p-5 rounded-md">
          {/* Left Column - Table */}
          <div className="">
            <Table >
              <TableBody className="text-[#3f3f3f]">
                <TableRow className="border-none">
                  <TableCell className="align-top break-words w-40">
                    Project Name
                  </TableCell>
                  <TableCell className="break-words capitalize">
                    {name}
                  </TableCell>
                </TableRow>
                <TableRow className="border-none">
                  <TableCell className="align-top break-words w-40">
                    Project Type
                  </TableCell>
                  <TableCell className="break-words capitalize">
                    {type}
                  </TableCell>
                </TableRow>
                <TableRow className="border-none">
                  <TableCell className="align-top break-words w-40">
                    Location
                  </TableCell>
                  <TableCell className="break-words">{location}</TableCell>
                </TableRow>
                <TableRow className="border-none">
                  <TableCell className="align-top break-words w-40">
                    Size
                  </TableCell>
                  <TableCell className="break-words">{size}</TableCell>
                </TableRow>
                <TableRow className="border-none">
                  <TableCell className="align-top break-words w-40">
                    Status
                  </TableCell>
                  <TableCell className="break-words">{status}</TableCell>
                </TableRow>
                <TableRow className="border-none">
                  <TableCell className="align-top break-words w-40">
                    Project Credit
                  </TableCell>
                  <TableCell className="break-words">{client}</TableCell>
                </TableRow>
                <TableRow className="border-none">
                  <TableCell className="align-top break-words w-40">
                    Role
                  </TableCell>
                  <TableCell className="break-words">Project Manager</TableCell>
                </TableRow>
                <TableRow className="border-none">
                  <TableCell className="align-top break-words w-40">
                    Year
                  </TableCell>
                  <TableCell className="break-words">{year}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Right Column - Description */}
          <div className="text-[#3f3f3f]">
            <h4 className="uppercase text-sm mb-4">Description</h4>
            <p className="leading-relaxed">{description}</p>
          </div>
        </div>
      </div>

      {/* Gallery */}
      {gallery && gallery.length > 0 && (
        <div className="mx-auto w-full py-12 px-4">
        <h2 className="text-2xl font-semibold uppercase text-gray-900 mb-8">Photo Gallery</h2>
          <div className="columns-1 sm:columns-2 md:columns-3 gap-8 rounded-md overflow-hidden">
            {gallery.map((img, i) => (
              <div key={i} className="mb-8 break-inside-avoid">
                <img
                  src={img}
                  alt={`${name} ${i + 1}`}
                  className="w-full rounded-lg shadow-md grayscale-100 hover:grayscale-0 duration-300 transition cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <SliderGallery gallery={gallery ?? []} showNumbers={false} />
    </div>
  );
};

export default SingleProject;
