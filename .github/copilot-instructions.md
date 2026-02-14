# Jolrong Client - AI Agent Instructions

## Project Overview
**Jolrong** is a React + TypeScript + Vite-based portfolio and project management platform for architects/designers. It features a public-facing site (home, projects, about, contact) and a protected admin dashboard for managing projects and gallery images.

### Tech Stack
- **Frontend**: React 19, TypeScript, Vite 7
- **State Management**: Redux Toolkit with RTK Query
- **Styling**: Tailwind CSS 4, Framer Motion, GSAP, Lucide React
- **UI Components**: shadcn/ui (Radix UI)
- **Routing**: React Router v7
- **HTTP Client**: Axios with custom interceptors
- **Animations**: Lenis (smooth scrolling), Framer Motion, GSAP, OGL (Aurora effect)

## Architecture

### Route Structure
- Public routes mounted on root (`/`) with `App.tsx` layout:
  - `/` - Home page
  - `/projects` - All projects listing
  - `/projects/:slug` - Single project detail
  - `/art-and-craft` - Art & Craft page
  - `/about` - About page
  - `/contact` - Contact page
- Admin routes (`/jolrong-login`, `/dashboard/**`) protected by `ProtectedRoute` wrapper
- Dashboard nested routes under `/dashboard`:
  - `/dashboard` - Default (all projects view)
  - `/dashboard/create-project/` - Create new project
  - `/dashboard/edit-project/:slug` - Edit existing project
  - `/dashboard/all-images` - Gallery management
  - `/dashboard/upload-images` - Upload new images

**Key Files**: [src/routes/index.tsx](src/routes/index.tsx), [src/App.tsx](src/App.tsx), [src/layout/DashboardLayout.tsx](src/layout/DashboardLayout.tsx)

### Data Management
**Redux Toolkit RTK Query** is the source of truth. The setup:
1. [src/redux/store.ts](src/redux/store.ts) - Configures store with baseApi middleware
2. [src/redux/baseApi.ts](src/redux/baseApi.ts) - Defines RTK Query API with three tag types: `["PROJECTS", "GALLERY", "ADMIN"]`
3. [src/redux/axiosBaseQuery.ts](src/redux/axiosBaseQuery.ts) - Custom base query using Axios. Supports `body` or `data` params and handles `formData` flag.
4. API endpoints in [src/redux/api/](src/redux/api/) organized by domain:
   - `projects/projects.api.ts` - Project CRUD and queries
   - `gallery/` - Image CRUD operations
   - `auth/` - Authentication endpoints
5. [src/redux/hook.ts](src/redux/hook.ts) - Typed hooks: `useAppDispatch`, `useAppSelector`

**Critical Pattern**: Use `body` (preferable) or `data` in RTK Query mutation/query configurations to pass payload. The custom `axiosBaseQuery` handles both.

### API Integration
- Axios instance in [src/lib/axios.ts](src/lib/axios.ts) with:
  - Base URL from `VITE_BASE_API` env var
  - Credentials enabled (`withCredentials: true`)
  - Request/response interceptors (currently minimal)
- All API calls go through RTK Query endpoints (no direct axios calls)
- Response structure: `{ success: boolean; message: string; data: T }`
- Pagination support via `IPaginationParams`/`IPaginationResponse` types

### Component Organization
- **UI Components** ([src/components/ui/](src/components/ui/)) - shadcn/ui primitives, imported from their lib
- **Feature Components** - Grouped by feature:
  - `Animated/` - Animated sequences (CircleLoader, MediaModal)
  - `Aurora/` - WebGL aurora effect using OGL library
  - `Modules/` - Page sections (HeadSection, Gallery, Projects)
  - `Animated/ScrollStack/` - Custom scroll-stacked layout
- **Shared** - Logo, cross-app utilities
- **Layout** - Page wrappers: `BaseSection`, `ContainerWidth`, `DashboardLayout`, `FullWidth`, `Header2`, `Header3`

### Type Safety
All domain models in [src/types/index.ts](src/types/index.ts):
- `IProject`, `ICreateProjectPayload`, `IUpdateProjectPayload` - Project entities
- `IGalleryImage` - Image metadata from Cloudinary
- `IAdminLogin`, `IAdminRegister` - Auth payloads
- Enums: 
  - `ProjectType`: `EXTERIOR`, `INTERIOR`, `STRUCTURAL`, `GRAPHICS`, `LANDSCAPE`
  - `ProjectStatus`: `ONGOING`, `UPCOMING`, `COMPLETED`
  - `TypeOfWork`: `DESIGN`, `VISUALIZATION`, `ANIMATION`, `CONSULTANCY`

## Development Workflows

### Build & Run
```bash
npm run dev        # Start Vite dev server (port 5173)
npm run build      # TypeScript check + Vite production build
npm run lint       # ESLint TypeScript check
npm run preview    # Preview production build locally
```
**Key**: Build runs `tsc -b` before vite to catch type errors early.

### Environment Setup
Create `.env.local` with:
```env
VITE_BASE_API=http://localhost:9000/api/v1  # Backend API endpoint
```

### Code Patterns

**Redux Hook Usage**:
```tsx
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useGetAllProjectsQuery, useCreateProjectMutation } from '@/redux/api/projects/projects.api';

// In component:
const { data, isLoading, error } = useGetAllProjectsQuery({ page: 1, limit: 10 });
const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
```

**Form Handling**: Uses React Hook Form with shadcn form primitives ([src/components/ui/form.tsx](src/components/ui/form.tsx))

**File Uploads**: Use `formData: true` in `extraOptions` or directly in query arguments if checking `axiosBaseQuery` implementation allows it. The current implementation checks for `formData` property in the args object passed to `query`:
```tsx
// In API definition
createProject: builder.mutation({
  query: (data) => ({
    url: "/project",
    method: "POST",
    body: data, 
    formData: true // Triggers multipart/form-data header
  })
})
```

**Smooth Scrolling**: Lenis initialized in [src/App.tsx](src/App.tsx) with custom easing - handles page scroll animations automatically.

**Theme Switching**: Theme provider in [src/provider/theme-provider.tsx](src/provider/theme-provider.tsx) with next-themes.

## Key Considerations

1. **Tag Invalidation**: After mutations, RTK Query automatically refetches tagged queries. E.g., creating a project invalidates `["PROJECTS"]` tag.
2. **Protected Routes**: Admin dashboard requires auth check in `ProtectedRoute` wrapper
3. **Slug-based Routing**: Projects use URL slugs (not IDs) for public routes to improve SEO
4. **FormData Handling**: Gallery image uploads use FormData; ensure `formData: true` is set in query objects for `axiosBaseQuery`.
5. **Responsive Design**: Mobile-first Tailwind; use `use-mobile.ts` hook for mobile-specific logic and `DesktopHeader`/`MobileHeader` split.
6. **Path Aliases**: `@/` resolves to `src/` (configured in tsconfig and vite.config)
7. **Tailwind v4**: Uses the new v4 configuration. CSS variables are defined in `src/index.css`.
