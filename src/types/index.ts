import type { Variants } from "framer-motion";

export type IAdminRegister = {
    name: string;
    email: string;
    password: string;
}


export type IAdminLogin = {
    email: string;
    password: string;
}


export interface IGalleryImage {
  _id: string;
  owner: string;
  public_id: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPaginationParams {
  page?: number;
  limit?: number;
}

export interface IPaginationResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}


export type ProjectType ="EXTERIOR"| "INTERIOR" | "STRUCTURAL" | "GRAPHICS" | "LANDSCAPE"

export type ProjectStatus = "ONGOING"| "UPCOMING" | "COMPLETED"

export type TypeOfWork = "DESIGN" | "VISUALIZATION" |  "ANIMATION" | "CONSULTANCY"


export interface IProject {
  _id: string;
  authorId: string;
  name: string;
  client: string;
  location: string;
  size: string;
  type: ProjectType;
  status: ProjectStatus;
  typeofWork: TypeOfWork[]
  year: string;
  description?: string;
  image?: string;
  color?: string;
  gallery?: string[];
  budget?: string;
  slug: string;
  tags?: string[];
  featuredVideo?: string,
  isFeatured: boolean;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateProjectPayload {
  authorId: string;
  name: string;
  client: string;
  location: string;
  size: string;
  type: ProjectType;
  status: ProjectStatus;
  typeofWork: TypeOfWork[]
  year: string;
  featuredVideo?: string,
  description?: string;
  image?: string;
  color?: string;
  gallery?: string[];
  budget?: string;
  tags?: string[];
  isFeatured?: boolean;
  isPublic?: boolean;
}

export interface IUpdateProjectPayload {
  name?: string;
  client?: string;
  location?: string;
  size?: string;
  type?: ProjectType;
  typeofWork?: TypeOfWork[] 
  status?: ProjectStatus;
  description?: string;
  featuredVideo?: string,
  image?: string;
  year?: string;
  color?: string;
  gallery?: string[];
  budget?: string;
  tags?: string[];
  isFeatured?: boolean;
  isPublic?: boolean;
}

export interface IProjectQueryParams {
  search?: string;
  type?: string;
  status?: string;
  sortBy?: string;
  typeofWork?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
  year?:string;
  isFeatured?: boolean;
  isPublic?: boolean;

}

export interface IProjectsResponse {
  success: boolean;
  message: string;
  data: IProject[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}



export const imageVariants : Variants = {
  hidden: { y: 70, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" },
  },
}


export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, 
    },
  },
};

export interface ICreative {
  _id: string;
  title: string;
  content: string;
  image: string;
  tags: string[];
  isFeatured: boolean;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  slug?: string;
}

export interface ICreativeQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface ICreativeResponse {
  success: boolean;
  message: string;
  data: ICreative[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}