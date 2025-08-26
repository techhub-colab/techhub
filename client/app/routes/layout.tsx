import { GithubFilled, InstagramFilled, LinkedinFilled } from '@ant-design/icons';
import axios from 'axios';
import { Link, Outlet } from 'react-router';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '~/components/ui/navigation-menu';
import { Toaster } from '~/components/ui/sonner';
import { AuthProvider } from '~/contexts/auth';
import { getBaseUrl } from '~/utils/url';
import type { Route } from './+types/layout';

type FooterData = {
  title: string;
  links: { [key: string]: string };
}

export async function loader({ request }: Route.LoaderArgs) {
  const res = await axios.get<FooterData>(`${getBaseUrl(request)}/footer-data.json`);
  return res.data;
}

export default function Layout({ loaderData }: Route.ComponentProps) {
  return (
    <AuthProvider>
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
              <NavigationMenuLink asChild>
                <Link to="/login">
                  Log In
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>
      <main className="flex justify-center">
        <div className="p-5 w-full lg:w-2/3">
          <Outlet />
        </div>
      </main>
      <footer className="px-12 py-6 text-center">
        <div className="italic text-sm text-[var(--muted-foreground)]">
          {loaderData.title}
        </div>
        <div className="mt-3 flex justify-center gap-6">
          <Link to={loaderData.links['github']} target="_blank">
            <GithubFilled className="text-2xl" />
          </Link>
          <Link to={loaderData.links['linkedin']} target="_blank">
            <LinkedinFilled className="text-2xl" />
          </Link>
          <Link to={loaderData.links['instagram']} target="_blank">
            <InstagramFilled className="text-2xl" />
          </Link>
        </div>
      </footer>
      <Toaster />
    </AuthProvider>
  );
}
