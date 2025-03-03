import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/src/components/ui/sidebar";
import { AppleIcon, LayoutDashboard, Package, Sliders } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function DashboardSidebar() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <Sidebar>
      <SidebarHeader className="flex h-14 items-center border-b px-4">
        <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
          <AppleIcon className="h-6 w-6" />
          <span>Apple CMS</span>
        </Link>
        <SidebarTrigger className="ml-auto md:hidden" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
              <Link to="/dashboard">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith("/dashboard/products")}
            >
              <Link to="/dashboard/products">
                <Package className="mr-2 h-4 w-4" />
                <span>Products</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith("/dashboard/product-options")}
            >
              <Link to="/dashboard/product-options">
                <Sliders className="mr-2 h-4 w-4" />
                <span>Product Options</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
