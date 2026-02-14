import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useUserInfoQuery } from "@/redux/api/auth/auth.api";
import { Link } from "react-router";
import Logo from "./Shared/Logo";
import { NavUser } from "./NavUser";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Projects",
      url: "#",
      items: [
        {
          title: "All Project",
          url: "/dashboard",
        },
        {
          title: "Create Project",
          url: "/dashboard/create-project",
        },
      ],
    },
    {
      title: "Gallery",
      url: "#",
      items: [
        {
          title: "All Images",
          url: "/dashboard/all-images",
        },
        {
          title: "Upload Images",
          url: "/dashboard/upload-images",
        },
      ],
    },
    {
      title: "Art & Craft",
      url: "#",
      items: [
        {
          title: "All Posts",
          url: "/dashboard/creative",
        },
        {
          title: "Create Post",
          url: "/dashboard/creative/create",
        },
      ]
    },
    {
      title: "Slider",
      url: "#",
      items: [
        {
          title: "All Slider",
          url: "/dashboard/slider",
        },
        {
          title: "Create Slider",
          url: "/dashboard/slider/create",
        },
        {
          title: "Reorder Slider",
          url: "/dashboard/slider/reorder",
        },
      ]
    },
    {
      title: "Quick Link",
      url: "#",
      items: [
        {
          title: "Home",
          url: "/",
        },
        {
          title: "Projects",
          url: "/projects",
        }, {
          title: "Art & Craft",
          url: "/art-and-craft",
        },
        {
          title: "About",
          url: "/about",
        },
        {
          title: "Contact",
          url: "/contact",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useUserInfoQuery({});
  // const navigate = useNavigate();
  const user = userData?.data;
  // console.log(user);
  // const [logout, { isLoading: logoutLoading }] = useLogoutMutation();
  // const dispatch = useAppDispatch();


  // const handleLogout = async () => {
  //   try {
  //     await logout(undefined).unwrap();
  //     // Reset API state to clear all cached data
  //     dispatch(authApi.util.resetApiState());
  //     navigate("/");
  //     toast.success("Logout successfull");
  //   } catch (error) {
  //     console.error("Logout failed:", error);
  //   }
  // }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>

      <SidebarContent className="mt-10">
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

      </SidebarContent>


      <SidebarFooter className="bg-gray-100">
        {user && (
          <NavUser
            user={{
              name: user.name,
              email: user.email,
              profilePic: user.profilePic || "",
            }}
          />
        )}
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
