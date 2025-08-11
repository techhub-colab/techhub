import { Link, Outlet } from 'react-router';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '~/components/ui/navigation-menu';

export default function Layout() {
  return (
    <>
      <header className="sticky top-0 z-999">
        <NavigationMenu className="justify-between">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/">
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Blogs</NavigationMenuTrigger>
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
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink>
                Log In
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>
      <main className="flex justify-center">
        <div className="w-full lg:w-2/3">
          <Outlet />
        </div>
      </main>
      <footer className="flex flex-col items-center">
      </footer>
    </>
  );
}
