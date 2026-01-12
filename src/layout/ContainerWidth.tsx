import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface IContainerWid {
  children: ReactNode;
  className?: string;
}

const ContainerWidth = ({ children, className }: IContainerWid) => {
  return (
    <div
      className={cn(
        "container mx-auto space-y-5 px-4 md:px-0",
        className
      )}
    >
      {children}
    </div>
  );
};

export default ContainerWidth;
