/**
 * SEO Utilities for Jolrong Client
 * Handles structured data, metadata, and SEO helpers
 */

export interface SEOConfig {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
  author?: string;
  publishedDate?: string;
  updatedDate?: string;
  keywords?: string[];
}

/**
 * Generate Open Graph meta tags object
 */
export const generateOGTags = (config: SEOConfig) => {
  const tags: Record<string, string> = {
    "og:title": config.title,
    "og:description": config.description,
    "og:type": config.type || "website",
  };

  if (config.image) tags["og:image"] = config.image;
  if (config.url) tags["og:url"] = config.url;

  return tags;
};

/**
 * Generate Twitter Card meta tags object
 */
export const generateTwitterTags = (config: SEOConfig) => {
  return {
    "twitter:card": "summary_large_image",
    "twitter:title": config.title,
    "twitter:description": config.description,
    ...(config.image && { "twitter:image": config.image }),
  };
};

/**
 * Generate JSON-LD structured data for Organization
 */
export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Jolrong",
    alternateName: "Jolrong Architects",
    url: "https://jolrongarchitects.com",
    logo: "https://jolrongarchitects.com/logo.png",
    description:
      "Architecture farm in Dhaka, Bangladesh specializing in exterior, interior, structural design and visualization services.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "BD",
      addressLocality: "Dhaka",
      addressRegion: "Dhaka",
    },
    sameAs: [
      "https://www.facebook.com/jolrong",
      "https://www.instagram.com/jolrong",
      "https://www.linkedin.com/company/jolrong",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "contact@jolrong.com",
      availableLanguage: ["en", "bn"],
    },
    knowsAbout: [
      "Architecture",
      "Interior Design",
      "Structural Design",
      "3D Visualization",
      "Landscape Design",
      "Graphic Design",
    ],
  };
};

/**
 * Generate JSON-LD structured data for Project/CreativeWork
 */
export const generateProjectSchema = (project: {
  name: string;
  description: string;
  image?: string;
  datePublished?: string;
  creator?: string;
  projectType?: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    ...(project.image && { image: project.image }),
    ...(project.datePublished && { datePublished: project.datePublished }),
    ...(project.creator && { creator: { "@type": "Organization", name: project.creator } }),
    ...(project.projectType && { keywords: project.projectType }),
  };
};

/**
 * Generate JSON-LD structured data for BreadcrumbList
 */
export const generateBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>
) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

/**
 * Generate JSON-LD structured data for LocalBusiness
 */
export const generateLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Jolrong",
    description: "Architecture and Design Studio in Dhaka, Bangladesh",
    image: "https://jolrong.com/logo.png",
    url: "https://jolrong.com",
    telephone: "+880-1234-567890",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Your Street Address",
      addressLocality: "Dhaka",
      addressRegion: "Dhaka",
      postalCode: "1000",
      addressCountry: "BD",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
  };
};

/**
 * Generate canonical URL
 */
export const getCanonicalUrl = (pathname: string): string => {
  const baseUrl = "https://jolrongarchitects.com";
  return `${baseUrl}${pathname}`;
};

/**
 * SEO metadata for different pages
 */
export const PAGE_SEO_CONFIG: Record<string, SEOConfig> = {
  home: {
    title: "Jolrong Architects - Architecture Farm in Dhaka, Bangladesh",
    description:
      "Architecture firm in Dhaka specializing in residential, commercial, interior and landscape design. Expert visualization and consultancy services.",
    image: "https://jolrongarchitects.com/og-image-home.png",
    type: "website",
    keywords: [
      "Architecture",
      "Interior Design",
      "Exterior Design",
      "Dhaka",
      "Bangladesh",
      "Design Studio",
      "Visualization",
    ],
  },
  projects: {
    title: "Our Projects - Jolrong Architects",
    description:
      "Explore our portfolio of completed and ongoing architectural projects including residential, commercial, and interior design work.",
    image: "https://jolrongarchitects.com/og-image-projects.png",
    type: "website",
    keywords: ["Projects", "Portfolio", "Architecture", "Design", "Case Studies"],
  },
  about: {
    title: "About Jolrong - Architecture Studio",
    description:
      "Learn about Jolrong's mission, vision, and team. We are passionate about creating innovative and sustainable designs.",
    image: "https://jolrongarchitects.com/og-image-about.png",
    type: "website",
    keywords: ["About", "Team", "Mission", "Architecture", "Design Philosophy"],
  },
  contact: {
    title: "Contact Jolrong - Get In Touch",
    description:
      "Contact us for your architecture, design, and visualization needs. Reach out to our team in Dhaka, Bangladesh.",
    image: "https://jolrongarchitects.com/og-image-contact.png",
    type: "website",
    keywords: ["Contact", "Get In Touch", "Architecture", "Design Services"],
  },
  artAndCraft: {
    title: "Art & Craft - Creative Works | Jolrong",
    description:
      "Discover our creative works including graphics, animations, and artistic concepts from Jolrong Studio.",
    image: "https://jolrongarchitects.com/og-image-creative.png",
    type: "website",
    keywords: ["Art", "Craft", "Creative", "Graphics", "Animation", "Design"],
  },
};
