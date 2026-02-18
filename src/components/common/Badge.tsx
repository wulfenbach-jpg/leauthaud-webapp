
import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'emerald' | 'blue' | 'amber' | 'slate' | 'indigo';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, color = 'emerald', className = '' }) => {
  const colors = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
    slate: 'bg-slate-50 text-slate-600 border-slate-200',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-100',
  };

  return (
    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${colors[color]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
