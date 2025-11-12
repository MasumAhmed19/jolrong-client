import Copy from "../copy/Copy";

const HeadSecitonv2 = ({
  title = "Explore Our Proudly Collection",
  description = "Jolrong Architect will showcase its vision of contemporary architecture, interior design trends, and innovative living.",
}) => {
  return (
    <div className="mx-auto py-6 md:py-10 md:px-0">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-10">
        {/* Title */}
        <Copy>
          <h2 className="text-3xl md:text-5xl lg:text-7xl uppercase font-semibold text-left leading-tight md:leading-snug">
            {title}
          </h2>
        </Copy>

        {/* Description */}
        <div className="w-full md:w-1/2">
        <Copy>
          <p className="text-base md:text-md leading-7 md:leading-8 text-[#3f3f3f]/95">
            {description}
          </p>
        </Copy>
        </div>
      </div>
    </div>
  );
};

export default HeadSecitonv2;
