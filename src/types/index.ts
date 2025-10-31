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



export type ProjectType ="EXTERIOR"| "INTERIOR" | "STRUCTURAL" | "GRAPHICS"


export type ProjectStatus = "DESIGN"| "ONGOING"| "VISUALIZATION" |"COMPLETED"|"ANIMATION"

export interface IProject {
  _id: string;
  authorId: string;
  name: string;
  client: string;
  location: string;
  size: string;
  type: ProjectType;
  status: ProjectStatus;
  description?: string;
  image?: string;
  year: string;
  color?: string;
  gallery?: string[];
  budget?: string;
  slug: string;
  tags?: string[];
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
  type: ProjectType | string;
  status: ProjectStatus | string;
  description?: string;
  image?: string;
  year: string;
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
  type?: ProjectType | string;
  status?: ProjectStatus | string;
  description?: string;
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
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
  isFeatured?: boolean;
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