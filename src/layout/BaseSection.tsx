import { type ReactNode } from "react";

interface ISection {
  children: ReactNode;
}

const BaseSection = ({ children }: ISection) => {
  return <div className="py-[100px]">{children}</div>;
};

export default BaseSection;
