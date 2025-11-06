import { Link } from 'react-router'
import { Button } from '../ui/button'

const HeadSeciton = ({title="Explore Our Proudly Collection", btnText="Learn More", description="Jolrong Architect will showcase its vision of contemporary architecture, interior design trends, and innovative living."}) => {
  return (
    <div className='mx-auto p-5 md:p-10 bg-gray-50 '>
        <div className='flex flex-col md:flex-row items-start gap-5 md:items-end justify-between'>
          
          <div className='md:w-2/3 space-y-3'>
            <h2 className='text-2xl md:text-3xl lg:text-4xl font-semibol text-left text-primary whitespace-nowrap'>{title}</h2>
            <p className='md:text-lg leading-8 text-[#3f3f3f]/95'>{description}</p>
          </div>

          <div className='w-1/3 flex flex-col-reverse md:flex-col items-start md:items-end gap-5 '>
              <Button  size="lg" className='text-white bg-primary '>
                <Link to='/projects'>{btnText}</Link>
                </Button>
          </div>
        </div>
    </div>
  )
}

export default HeadSeciton