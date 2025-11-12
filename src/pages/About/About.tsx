import Copy from "@/components/copy/Copy";
import HeadSecitonv2 from "@/components/Modules/HeadSectionv2";
import { imageVariants } from "@/types";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-white mt-20">
      {/* <div className='rounded-2xl overflow-hidden h-[50vh]'>
        <img src="https://i.ibb.co.com/4n5zdQL7/download.webp" alt=""  className='h-full w-full object-cover'/>
      </div> */}
      <div className="md:pt-[60px] md:mb-[100px] ">
        <HeadSecitonv2
          title="About Us"
          description="Ready to transform your space? We'd love to hear about your project and discuss how 
              we can bring your architectural vision to life.."
        />
      </div>

      <section className="">
        <div className="container mx-auto ">
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
                    Founded in 2023, Jolrong Architechture began as a vision to
                    transform how people experience architectural spaces. Our
                    journey started with a simple belief: that great design has
                    the power to enhance lives and create lasting value.
                  </p>
                </Copy>
                <Copy delay={0.4}>
                  <p>
                    Today, we are recognized as leaders in contemporary
                    architecture, having completed over 500 projects across
                    residential, commercial, and institutional sectors. Our work
                    spans from intimate private residences to large-scale urban
                    developments.
                  </p>
                </Copy>
                <Copy delay={0.45}>
                  <p>
                    We believe in the power of collaboration, working closely
                    with our clients to understand their unique needs and
                    aspirations. Every project is an opportunity to push
                    boundaries and create something extraordinary.
                  </p>
                </Copy>
              </div>
            </div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
>
              <motion.img
                variants={imageVariants}
                src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Our architectural workspace"
                className="w-full h-96 object-cover rounded-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
