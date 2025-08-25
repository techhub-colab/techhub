import DOMPurify from 'dompurify';
import MarkdownIt from 'markdown-it';
import { isServer } from '~/utils/ssr';

const markdownToHtml = async (markdown) => {
  if (isServer()) {
    const md = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true
    });
    const { JSDOM } = await import('jsdom');
    const purify = DOMPurify(new JSDOM('').window);
    const html = md.render(markdown);
    return purify.sanitize(html);
  } else {
    const CherryEngine = (await import('cherry-markdown/dist/cherry-markdown.engine.core')).default;
    // noinspection JSClosureCompilerSyntax
    const cherryEngine = new CherryEngine();
    const html = cherryEngine.makeHtml(markdown);
    return DOMPurify.sanitize(html);
  }
};

export { markdownToHtml };
