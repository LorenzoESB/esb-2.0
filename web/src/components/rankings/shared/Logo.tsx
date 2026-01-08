import { useState, useMemo } from 'react';

interface LogoProps {
  src?: string;
  alt: string;
  className?: string;
}

export function Logo({ src, alt, className }: LogoProps) {
  const valid = useMemo(() => {
    if (!src || typeof src !== 'string') return false;
    const url = src.trim();
    if (url === '') return false;
    return /^https?:\/\//.test(url) || url.startsWith('/');
  }, [src]);

  const [hidden, setHidden] = useState(!valid);

  if (hidden) return null;

  return (
    <img
      src={src as string}
      alt={alt}
      className={className}
      onError={() => setHidden(true)}
    />
  );
}
