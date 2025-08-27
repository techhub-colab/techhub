import axios from 'axios';
import { Outlet } from 'react-router';
import Footer, { type FooterData } from '~/components/layout/footer';
import Header from '~/components/layout/header';
import { Toaster } from '~/components/ui/sonner';
import { AuthProvider } from '~/contexts/auth';
import { getBaseUrl } from '~/utils/url';
import type { Route } from './+types/layout';

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
  return (
    <AuthProvider>
      <Header />
      <main className="flex justify-center">
        <div className="p-5 w-full lg:w-2/3">
          <Outlet />
        </div>
      </main>
      <Footer data={footerData} />
      <Toaster />
    </AuthProvider>
  );
}
