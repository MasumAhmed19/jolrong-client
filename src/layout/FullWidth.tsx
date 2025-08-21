import type {ReactNode} from 'react'

interface FullWidthProps{
    children: ReactNode
}

const FullWidth = ({children}:FullWidthProps) => {
  return (
    <div className='p-[2vh] md:px-[3.8vh] space-y-5'>{children}</div>
  )
}

export default FullWidth