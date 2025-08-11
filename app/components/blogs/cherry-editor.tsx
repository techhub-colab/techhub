import Cherry from 'cherry-markdown';
import type { CherryOptions } from 'cherry-markdown/types/cherry';
import { useCallback, useEffect, useRef, useState } from 'react';
import 'cherry-markdown/dist/cherry-markdown.css';
import '~/styles/cherry-markdown.css';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

const markdownTemplate = `# Heading 1
## Heading 2
Paragraph here
### Heading 3
If you know, you know ;)`;

const allowedFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];
const allowedFileExtensions = ['.jpg', '.jpeg', '.png'];

const cherryConfig: CherryOptions = {
  id: 'cherry-editor',
  locale: 'en_US',
  toolbars: {
    toolbar: [
      'bold',
      'italic',
      'strikethrough',
      '|',
      'color',
      'header',
      'ruby',
      '|',
      'list',
      'panel',
      'detail',
      {
        insert: [
          'image',
          'link',
          'hr',
          'br',
          'code',
          'formula',
          'toc',
          'table'
        ]
      },
      'graph'
    ],
    toc: {}
  },
  fileTypeLimitMap: {
    image: allowedFileExtensions.join(','),
    video: '',
    audio: '',
    word: '',
    pdf: '',
    file: ''
  }
};

function CherryEditor() {
  const cherryInstance = useRef<Cherry | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [html, setHtml] = useState('');

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const handleContentChange = useCallback((text: string, html: string) => {
    setContent(text);
    setHtml(html);
  }, []);

  useEffect(() => {
    if (!cherryInstance.current) {
      cherryConfig.value = markdownTemplate;
      cherryConfig.event = cherryConfig.event ?? {};
      cherryConfig.event.afterInit = handleContentChange;
      cherryInstance.current = new Cherry(cherryConfig);
      cherryInstance.current.on('afterChange', handleContentChange);
    }
  }, []);

  return (
    <>
      <div className="h-[56px] px-5 relative z-99 bg-white flex items-center gap-4">
        <Input placeholder="Title" onChange={handleTitleChange} />
        <Button className="px-5 rounded-full">Post</Button>
      </div>
      <div id={cherryConfig.id} className="!h-[calc(100vh-56px)]" />
    </>
  );
}

export default CherryEditor;
