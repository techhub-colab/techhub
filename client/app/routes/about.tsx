import axios from 'axios';
import { useEffect, useState } from 'react';
import aboutStyles from '~/styles/about.css?url';
import cherryStyles from '~/styles/cherry-markdown.css?url';
import { markdownToHtml } from '~/utils/markdown';
import { markdownToHtmlClient } from '~/utils/markdown.client';
import type { Route } from './+types/about';
import 'cherry-markdown/dist/cherry-markdown.css';

export function links() {
  return [
    { rel: 'stylesheet', href: aboutStyles },
    { rel: 'stylesheet', href: cherryStyles }
  ];
}

export async function loader() {
  const res = await axios.get<string>(`${process.env.SITE_CONTENT_URL}/about.md`);
  const html: string = await markdownToHtml(res.data);
  return { markdown: res.data, html };
}

export default function About({ loaderData }: Route.ComponentProps) {
  const { markdown, html } = loaderData;
  const [content, setContent] = useState(html);

  useEffect(() => {
    markdownToHtmlClient(markdown)
      .then(result => setContent(result))
      .catch(error => console.error(error));
  }, [markdown]);

  return (
    <div
      className="about-page cherry-markdown"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
