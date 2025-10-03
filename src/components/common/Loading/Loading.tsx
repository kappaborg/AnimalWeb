import clsx from 'clsx';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

export const Loading = ({ size = 'md', fullScreen = false }: LoadingProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };
  
  const spinner = (
    <div
      className={clsx(
        'border-gray-300 border-t-primary rounded-full animate-spin',
        sizeClasses[size]
      )}
    />
  );
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 z-50">
        {spinner}
      </div>
    );
  }
  
  return spinner;
};

export default Loading;

