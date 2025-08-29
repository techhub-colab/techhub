import { SettingsIcon, ShieldCheckIcon, UserRoundPenIcon } from 'lucide-react';
import { Link, Outlet } from 'react-router';
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider
} from '~/components/ui/sidebar';

export default function Settings() {
  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-1/4">
        <SidebarProvider className="min-h-auto h-auto">
          <Sidebar collapsible="none" className="w-full bg-background">
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton className="h-auto py-3">
                    <SettingsIcon />Settings
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton className="h-auto py-2" asChild>
                        <Link to="/settings/profile">
                          <UserRoundPenIcon />Profile
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton className="h-auto py-2" asChild>
                        <Link to="/settings/account">
                          <ShieldCheckIcon />Account
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      </div>
      <div className="w-full md:w-3/4 px-3">
        <Outlet />
      </div>
    </div>
  );
}
