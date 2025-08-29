import { GithubFilled, InstagramFilled, LinkedinFilled } from '@ant-design/icons';
import { Link } from 'react-router';

export type FooterData = {
  title: string;
  links: { [key: string]: string };
}

type FooterProps = {
  data?: FooterData;
}

export default function Footer({ data }: FooterProps) {
  if (!data) {
    console.error('Error loading footer data');
  }

  return data && (
    <footer className="px-12 py-6 text-center">
      <div className="italic text-sm text-[var(--muted-foreground)]">
        {data.title}
      </div>
      <div className="mt-3 flex justify-center gap-6">
        <Link to={data.links['github']} target="_blank">
          <GithubFilled className="text-2xl" />
        </Link>
        <Link to={data.links['linkedin']} target="_blank">
          <LinkedinFilled className="text-2xl" />
        </Link>
        <Link to={data.links['instagram']} target="_blank">
          <InstagramFilled className="text-2xl" />
        </Link>
      </div>
    </footer>
  );
}
