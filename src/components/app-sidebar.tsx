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
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { authApi, useLogoutMutation, useUserInfoQuery } from "@/redux/api/auth/auth.api";
import { Link, useNavigate } from "react-router";
import Logo from "./Shared/Logo";
import { Button } from "./ui/button";
import { useAppDispatch } from "@/redux/hook";
import { toast } from "sonner";

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
  const navigate = useNavigate();
  const user = userData?.data;
  // console.log(user);
  const [logout, { isLoading: logoutLoading }] = useLogoutMutation();
  const dispatch = useAppDispatch();


  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      // Reset API state to clear all cached data
      dispatch(authApi.util.resetApiState());
      navigate("/");
      toast.success("Logout successfull");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

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

      <SidebarFooter>
        <div>
          <Button
            variant="ghost"
            size="sm"
            className=""
            onClick={handleLogout}
            disabled={logoutLoading}
          >
            Logout
          </Button>
        </div>

        <div className="flex justify-between gap-2">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage
              src={user?.profilePic}
              alt={user?.name}
              className="object-cover"
            />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user?.name}</span>
            <span className="truncate text-xs">{user?.email}</span>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
