import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padded?: boolean;
  interactive?: boolean;
}

export default function Card({ children, padded = true, interactive = false, className = '', ...rest }: CardProps) {
  return (
    <div
      className={`glass rounded-[var(--radius-xl2)] ${padded ? 'p-5 sm:p-6' : ''} ${
        interactive ? 'transition-all duration-300 hover:border-teal-400/30 hover:-translate-y-0.5' : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
