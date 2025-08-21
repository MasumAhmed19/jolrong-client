import HeadSeciton from '@/components/Modules/HeadSection';
import ProjectsSection2 from './ProjectSection2';

const Projects = () => {


  return (
    <div className='flex flex-col gap-10 mt-20'>
      <div className='rounded-2xl overflow-hidden h-[50vh]'>
        <img src="https://i.ibb.co.com/4n5zdQL7/download.webp" alt=""  className='h-full w-full object-cover'/>
      </div>
      <div className='pt-[60px] md:mb-[100px]'>
        <HeadSeciton title='Our Portfolio' description="Ready to transform your space? We'd love to hear about your project and discuss how 
              we can bring your architectural vision to life." />
      </div>

      {/* <ProjectsSection /> */}
      <ProjectsSection2 />

    </div>
  )
}

export default Projects