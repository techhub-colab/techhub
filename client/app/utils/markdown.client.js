import CherryEngine from 'cherry-markdown/dist/cherry-markdown.engine.core';
import DOMPurify from 'dompurify';

export const markdownToHtmlClient = async (markdown) => {
  // noinspection JSClosureCompilerSyntax
  const cherryEngine = new CherryEngine();
  const html = cherryEngine.makeHtml(markdown);
  return DOMPurify.sanitize(html);
};
