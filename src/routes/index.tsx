import App from "@/App";
import About from "@/pages/About/About";
import Contact from "@/pages/Contact/Contact";
import Home from "@/pages/Home/Home";
import Projects from "@/pages/Projects/Projects";
import SingleProject from "@/pages/Projects/SingleProject";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, //by defaul tasks show krbe
        Component: Home,
      },
      {
        path: "/projects",
        Component: Projects,
      },
      {
        path: "/projects/:id",
        Component: SingleProject,
      },{
        path:'/about',
        Component: About
      },{
        path: '/contact',
        Component: Contact
      }
    ],
  },
]);

export default router;
