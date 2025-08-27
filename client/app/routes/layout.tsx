import { GithubFilled, InstagramFilled, LinkedinFilled } from '@ant-design/icons';
import axios from 'axios';
import { Link, Outlet } from 'react-router';
import Header from '~/components/layout/header';
import { Toaster } from '~/components/ui/sonner';
import { AuthProvider } from '~/contexts/auth';
import { getBaseUrl } from '~/utils/url';
import type { Route } from './+types/layout';

type FooterData = {
  title: string;
  links: { [key: string]: string };
}

// Prevent loader from re-executing on route change
export function shouldRevalidate() {
  return false;
}

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const res = await axios.get<FooterData>(`${getBaseUrl(request)}/footer-data.json`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

export default function Layout({ loaderData: footerData }: Route.ComponentProps) {
  if (!footerData) {
    console.error('Error loading footer data');
  }

  return (
    <AuthProvider>
      <Header />
      <main className="flex justify-center">
        <div className="p-5 w-full lg:w-2/3">
          <Outlet />
        </div>
      </main>
      {footerData && <footer className="px-12 py-6 text-center">
        <div className="italic text-sm text-[var(--muted-foreground)]">
          {footerData.title}
        </div>
        <div className="mt-3 flex justify-center gap-6">
          <Link to={footerData.links['github']} target="_blank">
            <GithubFilled className="text-2xl" />
          </Link>
          <Link to={footerData.links['linkedin']} target="_blank">
            <LinkedinFilled className="text-2xl" />
          </Link>
          <Link to={footerData.links['instagram']} target="_blank">
            <InstagramFilled className="text-2xl" />
          </Link>
        </div>
      </footer>}
      <Toaster />
    </AuthProvider>
  );
}
