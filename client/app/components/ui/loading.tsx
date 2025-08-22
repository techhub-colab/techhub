import { LoaderCircle } from 'lucide-react';

type LoadingProps = {
  fullscreen?: boolean
  withNav?: boolean
}

function Loading({ fullscreen = false, withNav = true }: LoadingProps) {
  const twHeight: string = fullscreen ?
    (withNav ? 'h-[calc(100vh-var(--nav-height))]' : 'h-screen') :
    '';

  return (
    <div className={`flex justify-center items-center py-3 ${twHeight}`}>
      <div className="animate-pulse">
        <LoaderCircle
          className="animate-spin text-primary"
          size={fullscreen ? 96 : 64}
        />
      </div>
    </div>
  );
}

export { Loading };
