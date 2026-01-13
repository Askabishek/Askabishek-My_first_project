import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs rounded-lg',
    md: 'w-10 h-10 text-sm rounded-xl',
    lg: 'w-16 h-16 text-xl rounded-2xl',
    xl: 'w-24 h-24 text-3xl rounded-[28px]',
  };

  return (
    <div className={`flex items-center justify-center bg-primary text-onPrimary font-bold shadow-sm tracking-tighter ${sizeClasses[size]} ${className}`}>
      TM
    </div>
  );
};