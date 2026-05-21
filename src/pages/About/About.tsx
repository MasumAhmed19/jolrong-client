import Copy from "@/components/copy/Copy";
import HeadSecitonv2 from "@/components/Modules/HeadSectionv2";
import ContainerWidth from "@/layout/ContainerWidth";
import { imageVariants } from "@/types";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import { generateLocalBusinessSchema } from "@/lib/seo";

const About = () => {
  return (
    <>
      <SEOHead
        title="About Jolrong - Architecture Studio in Dhaka"
        description="Learn about Jolrong's mission, vision, and team. We are passionate about creating innovative and sustainable architectural designs in Dhaka, Bangladesh."
        canonical="https://jolrongarchitects.com/about"
        ogImage="https://jolrongarchitects.com/og-image-about.png"
        ogType="website"
        keywords={["About", "Team", "Mission", "Architecture", "Design Philosophy", "Dhaka"]}
        structuredData={generateLocalBusinessSchema()}
      />
      <ContainerWidth className="min-h-screen bg-white mb-60 md:mb-25 md:px-0 px-6">
        <div className="md:py-[40px] ">
          <HeadSecitonv2
            title="About Us"
            description="Ready to transform your space? We'd love to hear about your project and discuss how 
              we can bring your architectural vision to life.."
          />
        </div>

        <section className="">
          <div className="">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <Copy delay={0.2}>
                  <h2 className="text-3xl sm:text-4xl font-light mb-6 text-gray-900">
                    Our Story
                  </h2>
                </Copy>
                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <Copy delay={0.3}>
                    <p>
                      Founded in 2022, Jolrong Architects started with a dream to create beautiful and comfortable architectural spaces. We believe that good design can make life better and bring happiness to people.
                    </p>
                  </Copy>
                  <Copy delay={0.4}>
                    <p>
                      Our specialty is <b>minimal and aesthetic</b> design. We love making simple, modern, and elegant designs that match our clients' needs and style.
                    </p>
                  </Copy>
                  <Copy delay={0.45}>
                    <p>
                      We work closely with our clients to understand their ideas and turn them into reality. Every project is important to us, and we always try to create something unique and meaningful.
                    </p>
                  </Copy>
                </div>
              </div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <motion.img
                  variants={imageVariants}
                  src="https://res.cloudinary.com/dxjv9fiab/image/upload/v1779376882/jolrong/7449295d-3b11-42f4-9a05-4b4c843dd09c-1779376882568.png"
                  alt="Our architectural workspace"
                  className="w-full h-96 object-cover rounded-2xl"
                />
              </motion.div>
            </div>
          </div>
        </section>
      </ContainerWidth>
    </>
  );
};

export default About;
