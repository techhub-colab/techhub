import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group flex justify-center !left-0 !right-0 !transform-none" // override
      position="top-center"
      richColors
      expand
      toastOptions={{
        className: '!w-auto !max-w-[356px] !mx-4 !left-auto !right-auto' // override
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--width': '100vw' // override
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
