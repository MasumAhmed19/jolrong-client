interface ImagePaths {
  heroImage1: string;
  heroImage2: string;
  heroImage3: string;
  heroImage4: string;
}

export const StaticImages: ImagePaths = {
  heroImage1: "https://i.ibb.co.com/3yxnzv7j/193920.jpg",
  heroImage2: "https://i.ibb.co.com/8LwjgcnD/145147.jpg",
  heroImage3:"https://i.ibb.co.com/qLPj9vdc/474023469-122104559084725907-1665409018107977917-n.jpg",
  heroImage4: "https://i.ibb.co.com/1YVGVkQj/10598.jpg",
} as const;


type ProjectType = 
  | "exterior" 
  | "interior" // Note: Typo kept consistent with your JSON
  | "structural" 
  | "graphics";

  type ProjectStatus =
  | "design"
  | "ongoing"
  | "visualization"
  | "completed"
  | "animation";

export interface IProject {
  id: number;
  name: string;
  client: string;
  location: string;
  size: string;
  type: ProjectType;
  status: ProjectStatus;
  description: string;
  image: string;
  year: number;
  color?: string;
  gallery?: string[];
}

interface IPortfolioData {
  projects: IProject[];
  categories: ProjectType[];
  statuses: ProjectStatus[];
}

export const portfolioData: IPortfolioData = {
  projects: [
    {
      id: 1,
      name: "Luxury Riverside Apartment (Gulshan)",
      client: "Delta Properties Ltd.",
      location: "Gulshan, Dhaka",
      size: "12,000 sq ft",
      type: "exterior",
      status: "completed",
      description: "Modern high-rise with sustainable materials and river-facing balconies.",
      image: "https://i.ibb.co.com/qLPj9vdc/474023469-122104559084725907-1665409018107977917-n.jpg",
      year: 2023,
      gallery: [
        "https://i.ibb.co.com/qLPj9vdc/474023469-122104559084725907-1665409018107977917-n.jpg",
        "https://i.ibb.co.com/d0cvPL1p/2.jpg",
        "https://i.ibb.co.com/qLPj9vdc/474023469-122104559084725907-1665409018107977917-n.jpg",
        "https://i.ibb.co.com/d0cvPL1p/2.jpg",
        "https://i.ibb.co.com/d0cvPL1p/2.jpg"
      ]
    },
    {
      id: 2,
      name: "Corporate Office Interior (Bashundhara)",
      client: "Telecom Solutions BD",
      location: "Bashundhara R/A, Dhaka",
      size: "8,500 sq ft",
      type: "interior",
      status: "ongoing",
      description: "Open-plan workspace with ergonomic furniture and natural lighting.",
      image: "https://i.ibb.co.com/5XKXxkHs/1.jpg",
      year: 2024,
      gallery: [
        "https://i.ibb.co.com/qLPj9vdc/474023469-122104559084725907-1665409018107977917-n.jpg",
        "https://i.ibb.co.com/d0cvPL1p/2.jpg",
        "https://i.ibb.co.com/qLPj9vdc/474023469-122104559084725907-1665409018107977917-n.jpg",
        "https://i.ibb.co.com/d0cvPL1p/2.jpg",
        "https://i.ibb.co.com/d0cvPL1p/2.jpg"
      ]
    },
    {
      id: 3,
      name: "Padma Bridge Support Structure",
      client: "Bangladesh Bridge Authority",
      location: "Mawa, Munshiganj",
      size: "2.5 km ancillary structures",
      type: "structural",
      status: "design",
      description: "Engineering design for auxiliary support structures near the Padma Bridge.",
      image: "https://i.ibb.co.com/d0cvPL1p/2.jpg",
      year: 2025,
      gallery: [
        "https://i.ibb.co.com/qLPj9vdc/474023469-122104559084725907-1665409018107977917-n.jpg",
        "https://i.ibb.co.com/d0cvPL1p/2.jpg",
        "https://i.ibb.co.com/qLPj9vdc/474023469-122104559084725907-1665409018107977917-n.jpg",
        "https://i.ibb.co.com/d0cvPL1p/2.jpg",
        "https://i.ibb.co.com/d0cvPL1p/2.jpg"
      ]
    },
    {
      id: 4,
      name: "Brand Identity for 'Bengal Crafts'",
      client: "Bengal Crafts Ltd.",
      location: "Dhaka",
      size: "Full branding package",
      type: "graphics",
      status: "completed",
      description: "Logo, packaging, and signage for a traditional handicraft company.",
      image: "https://i.ibb.co.com/MDqhSHsb/3.jpg",
      year: 2022,
      gallery: [
        "https://i.ibb.co.com/qLPj9vdc/474023469-122104559084725907-1665409018107977917-n.jpg",
        "https://i.ibb.co.com/d0cvPL1p/2.jpg",
        "https://i.ibb.co.com/qLPj9vdc/474023469-122104559084725907-1665409018107977917-n.jpg",
        "https://i.ibb.co.com/d0cvPL1p/2.jpg",
        "https://i.ibb.co.com/d0cvPL1p/2.jpg"
      ]
    },
    {
      id: 5,
      name: "Sylhet Tea Resort",
      client: "Sylhet Hospitality Group",
      location: "Sreemangal, Sylhet",
      size: "15-acre resort",
      type: "exterior",
      status: "visualization",
      description: "Eco-friendly resort blending modern architecture with tea-garden aesthetics.",
      image: "https://i.ibb.co.com/ch7Q9k9H/4.jpg",
      year: 2024,
      gallery: [
        "https://i.ibb.co.com/qLPj9vdc/474023469-122104559084725907-1665409018107977917-n.jpg",
        "https://i.ibb.co.com/d0cvPL1p/2.jpg",
        "https://i.ibb.co.com/qLPj9vdc/474023469-122104559084725907-1665409018107977917-n.jpg",
        "https://i.ibb.co.com/d0cvPL1p/2.jpg",
        "https://i.ibb.co.com/d0cvPL1p/2.jpg"
      ]
    },
    {
      id: 6,
      name: "Uttara Hospital Renovation",
      client: "MediCare Hospitals",
      location: "Uttara, Dhaka",
      size: "6 floors",
      type: "interior",
      status: "completed",
      description: "Patient-friendly redesign with improved ventilation and accessibility.",
      image: "https://i.ibb.co.com/0jVNTDdn/5.jpg",
      year: 2021,
      gallery: [
        "https://i.ibb.co.com/qLPj9vdc/474023469-122104559084725907-1665409018107977917-n.jpg",
        "https://i.ibb.co.com/d0cvPL1p/2.jpg",
        "https://i.ibb.co.com/qLPj9vdc/474023469-122104559084725907-1665409018107977917-n.jpg",
        "https://i.ibb.co.com/d0cvPL1p/2.jpg",
        "https://i.ibb.co.com/d0cvPL1p/2.jpg"
      ]
    }
  ],
  categories: ["exterior", "interior", "structural", "graphics"],
  statuses: ["design", "ongoing", "visualization", "completed", "animation"]
};



export const featuredData: IPortfolioData = {
  projects: [
    {
      "id": 1,
      "name": "Luxury Riverside Apartment (Gulshan)",
      "client": "Delta Properties Ltd.",
      "location": "Gulshan, Dhaka",
      "size": "12,000 sq ft",
      "type": "exterior",
      "status": "completed",
      "description": "Modern high-rise with sustainable materials and river-facing balconies. Modern high-rise with sustainable materials and river-facing balconies. Modern high-rise with sustainable materials and river-facing balconies.",
      "image": "https://i.ibb.co.com/qLPj9vdc/474023469-122104559084725907-1665409018107977917-n.jpg",
      "year": 2023,
      "color":"#fffbf9"
    },
    {
      "id": 2,
      "name": "Corporate Office Interior (Bashundhara)",
      "client": "Telecom Solutions BD",
      "location": "Bashundhara R/A, Dhaka",
      "size": "8,500 sq ft",
      "type": "interior",
      "status": "ongoing",
      "description": "Open-plan workspace with ergonomic furniture and natural lighting.",
      "image": "https://i.ibb.co.com/5XKXxkHs/1.jpg",
      "year": 2024,
      "color":"#f9fffa"
    },
    {
      "id": 3,
      "name": "Padma Bridge Support Structure",
      "client": "Bangladesh Bridge Authority",
      "location": "Mawa, Munshiganj",
      "size": "2.5 km ancillary structures",
      "type": "structural",
      "status": "design",
      "description": "Engineering design for auxiliary support structures near the Padma Bridge.",
      "image": "https://i.ibb.co.com/d0cvPL1p/2.jpg",
      "year": 2025,
      "color":"#fbf9ff"
    }
   
  ],
  categories: [
    "exterior",
    "interior",
    "structural",
    "graphics"
  ],
  statuses: [
    "design",
    "ongoing",
    "visualization",
    "completed",
    "animation"
  ]
}

export const CardVal={
  "Design":"",
  "Completed":""
}