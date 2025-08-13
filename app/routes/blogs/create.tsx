import loadable from '@loadable/component';
import { Loading } from '~/components/ui/loading';

const CherryEditor = loadable(() => import('~/components/blogs/cherry-editor.client'), {
  fallback: <Loading fullscreen withNav={false} />
});

export default function Create() {
  return (
    <CherryEditor />
  );
}
