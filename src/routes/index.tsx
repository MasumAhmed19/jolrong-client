import App from "@/App";
import DashboardLayout from "@/layout/DashboardLayout";
import About from "@/pages/About/About";
import AdminLogin from "@/pages/Auth/AdminLogin";
import Contact from "@/pages/Contact/Contact";
import AllImagesDashboard from "@/pages/Dashboard/Gallery/All-Images/AllImagesDashboard";
import UploadImagesDashboard from "@/pages/Dashboard/Gallery/UploadImages/UploadImagesDashboard";
import AllProjectDashboard from "@/pages/Dashboard/Projects/allProject/AllProjectDashboard";
import CreateProjectDashboard from "@/pages/Dashboard/Projects/createProject/CreateProjectDashboard";
import EditProjectDashboard from "@/pages/Dashboard/Projects/updateProject/EditProjectDashboard";
import AllCreativeDashboard from "@/pages/Dashboard/Creative/allCreative/AllCreativeDashboard";
import CreateCreativeDashboard from "@/pages/Dashboard/Creative/createCreative/CreateCreativeDashboard";
import EditCreativeDashboard from "@/pages/Dashboard/Creative/updateCreative/EditCreativeDashboard";
import Home from "@/pages/Home/Home";
import Projects from "@/pages/Projects/Projects";
import SingleProject from "@/pages/Projects/SingleProject";
import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import ArtAndCraft from "@/pages/Art and Craft/ArtAndCraft";
import CreativeModal from "@/pages/Art and Craft/CreativeModal";
import AllSlider from "@/pages/Dashboard/Slider/allSlider/AllSlider";
import ReorderSlider from "@/pages/Dashboard/Slider/reorderSlider/ReorderSlider";
import CreateSlider from "@/pages/Dashboard/Slider/createSlider/CreateSlider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/projects",
        Component: Projects,
      },
      {
        path: "/art-and-craft",
        Component: ArtAndCraft,
        children: [
          {
            path: ":slug",
            Component: CreativeModal,
          }
        ]
      },
      {
        path: "/projects/:slug",
        Component: SingleProject,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/contact",
        Component: Contact,
      },
    ],
  },
  {
    path: "/jolrong-login",
    Component: AdminLogin,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        Component: AllProjectDashboard,
      },
      {
        path: "/dashboard/create-project/",
        Component: CreateProjectDashboard,
      }, {
        path: "/dashboard/edit-project/:slug",
        Component: EditProjectDashboard,
      },
      {
        path: "/dashboard/all-images",
        Component: AllImagesDashboard,
      },
      {
        path: "/dashboard/upload-images",
        Component: UploadImagesDashboard,
      },
      {
        path: "/dashboard/creative",
        Component: AllCreativeDashboard,
      },
      {
        path: "/dashboard/creative/create",
        Component: CreateCreativeDashboard,
      },
      {
        path: "/dashboard/creative/edit/:id",
        Component: EditCreativeDashboard,
      },
      {
        path: "/dashboard/slider",
        Component: AllSlider,
      },
      {
        path: "/dashboard/slider/reorder",
        Component: ReorderSlider,
      },
      {
        path: "/dashboard/slider/create",
        Component: CreateSlider,
      }
    ],
  },
]);

export default router;
