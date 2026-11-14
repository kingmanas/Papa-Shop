import { useState } from 'react';
import { Wrench } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  className?: string;
}

export function ResilientImage({
  src,
  alt,
  fallbackTitle,
  className = '',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-2 bg-[#ECEEE9] text-[#4A5046] p-6 text-center ${className}`}
      >
        <Wrench className="w-8 h-8 text-[#1E5631]/70" strokeWidth={1.5} />
        <span className="text-xs font-medium tracking-wide uppercase text-[#4A5046] line-clamp-2 max-w-[20ch]">
          {fallbackTitle}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
