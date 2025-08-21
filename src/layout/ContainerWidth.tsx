import type { ReactNode } from "react"

interface IContainerWid{
    children: ReactNode
}

const ContainerWidth = ({children}:IContainerWid) => {
  return (
    <div className="container mx-auto p-[2vh] md:px-[3.8vh] space-y-5">{children}</div>
  )
}

export default ContainerWidth