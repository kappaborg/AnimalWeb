import clsx from 'clsx';
import { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = ({
  children,
  hoverable = false,
  padding = 'md',
  className,
  ...props
}: CardProps) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };
  
  return (
    <div
      className={clsx(
        'bg-white dark:bg-gray-800 rounded-xl shadow-md',
        'transition-all duration-200',
        hoverable && 'hover:shadow-lg hover:-translate-y-1 cursor-pointer',
        paddingStyles[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;

