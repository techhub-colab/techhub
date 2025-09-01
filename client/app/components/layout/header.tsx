import { LogOutIcon, SettingsIcon } from 'lucide-react';
import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { logout } from '~/.client/services/api/auth';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '~/components/ui/navigation-menu';
import { Separator } from '~/components/ui/separator';
import { useAuth } from '~/contexts/auth';

export default function Header() {
  const { isAuthenticated, user, clearAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
    clearAuth();
    navigate('/');
    toast.info('You have been logged out');
  }, [clearAuth, navigate]);

  return (
    <header className="sticky top-0 z-999">
      <NavigationMenu className="justify-between text-base">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/">
                Home
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              Blogs
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[120px]">
                <NavigationMenuLink asChild>
                  <Link to="/blogs/create" target="_blank">
                    New Blog
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link to="#">
                    My Blogs
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link to="#">
                    Discover
                  </Link>
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/about">
                About
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
        {isAuthenticated ?
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger asChild>
                <Avatar className="cursor-pointer transition-opacity duration-300 hover:opacity-70">
                  <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
                  <AvatarFallback>{user?.username.charAt(0)}</AvatarFallback>
                </Avatar>
              </NavigationMenuTrigger>
              <NavigationMenuContent className="left-auto right-0">
                <NavigationMenuLink className="gap-1.5" asChild>
                  <Link to="/settings/profile">
                    <SettingsIcon />Settings
                  </Link>
                </NavigationMenuLink>
                <Separator className="my-1" />
                <NavigationMenuLink className="gap-1.5" onClick={handleLogout}>
                  <LogOutIcon />Logout
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList> :
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/login">
                  Log In
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>}
      </NavigationMenu>
    </header>
  );
}
