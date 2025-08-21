import Description from "@/components/Description/Description";
import Magnet from "@/components/Magnet/Magnet";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-[50vh] container mx-auto flex items-center gap-5">
      <div className="w-full">
        <Description
          headline="At Jolrong, we are passionate about redefining farm architecture in Bangladesh by blending tradition, innovation, and sustainability. Our designs honor the vibrant agricultural heritage of the region while introducing smart, eco-friendly structures that empower farmers and protect the environment."
          textSize="text-3xl"
          textColor="text-gray-900 text-justify"
        />
      </div>
      <div className="relative w-full px-[100px]">
         <Description
          headline="We believe in building resilient, beautiful farm environments that stand the test of time — setting a new standard for agricultural spaces in the digital era. Join Jolrong as we cultivate the future of farming through thoughtful design and sustainable innovation."
          textSize=""
          textColor=""
        />
       
        <div className="mt-10">
            <Magnet >
                <Button className="w-[10vh] h-[10vh] rounded-full cursor-pointer">About</Button>
            </Magnet>
                   </div>
      </div>
    </div>
  );
};

export default About;
