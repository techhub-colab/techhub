import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_SITE_CONTENT_URL } from '~/constants';
import aboutStyles from '~/styles/about.css?url';
import cherryStyles from '~/styles/cherry-markdown.css?url';
import { markdownToHtml } from '~/utils/markdown-util';
import type { Route } from './+types/about';
import 'cherry-markdown/dist/cherry-markdown.css';

export function links() {
  return [
    { rel: 'stylesheet', href: aboutStyles },
    { rel: 'stylesheet', href: cherryStyles }
  ];
}

export async function loader() {
  const res = await axios.get<string>(`${BASE_SITE_CONTENT_URL}/about.md`);
  const html: string = await markdownToHtml(res.data);
  return { markdown: res.data, html };
}

export default function About({ loaderData }: Route.ComponentProps) {
  const { markdown, html } = loaderData;
  const [content, setContent] = useState(html);

  useEffect(() => {
    markdownToHtml(markdown)
      .then(html => setContent(html))
      .catch(error => console.error(error));
  }, [markdown]);

  return (
    <div
      className="about-page cherry-markdown"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
