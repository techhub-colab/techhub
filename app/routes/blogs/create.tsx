import loadable from '@loadable/component';

const CherryEditor = loadable(() => import('~/components/blogs/cherry-editor'));

export default function Create() {
  return (
    <CherryEditor />
  );
}
