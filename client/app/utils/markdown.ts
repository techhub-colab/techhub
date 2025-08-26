import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import MarkdownIt from 'markdown-it';

export const markdownToHtml = async (markdown: string) => {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
  });
  const purify = DOMPurify(new JSDOM('').window);
  const html = md.render(markdown);
  return purify.sanitize(html);
};
