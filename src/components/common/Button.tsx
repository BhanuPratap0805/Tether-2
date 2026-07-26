import { motion } from 'framer-motion';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-teal-500 text-dusk-950 hover:bg-teal-400 shadow-[0_8px_24px_-8px_rgba(79,168,155,0.6)]',
  secondary: 'glass-light text-sky-50 hover:bg-white/[0.14]',
  ghost: 'bg-transparent text-sky-100 hover:bg-white/[0.08]',
  danger: 'bg-coral-500 text-dusk-950 hover:bg-coral-400 shadow-[0_8px_24px_-8px_rgba(217,125,108,0.55)]',
};

const sizeClasses: Record<Size, string> = {
  sm: 'text-sm px-3.5 py-2 gap-1.5',
  md: 'text-sm px-5 py-2.5 gap-2',
  lg: 'text-base px-7 py-3.5 gap-2.5',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  fullWidth = false,
  className = '',
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center rounded-full font-medium tracking-tight transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...(rest as any)}
    >
      {loading ? (
        <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="text-[1.05em]">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="text-[1.05em]">{icon}</span>}
        </>
      )}
    </motion.button>
  );
}
