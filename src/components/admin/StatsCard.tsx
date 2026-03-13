'use client';

import { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  description?: string;
  color?: 'blue' | 'green' | 'purple' | 'orange';
  loading?: boolean;
}

const colorMap = {
  blue:   { bg: '', icon: 'text-teal',  iconBg: 'bg-teal-light/60' },
  green:  { bg: '', icon: 'text-teal',  iconBg: 'bg-teal-light/60' },
  purple: { bg: '', icon: 'text-teal',  iconBg: 'bg-teal-light/60' },
  orange: { bg: '', icon: 'text-teal',  iconBg: 'bg-teal-light/60' },
};

export default function StatsCard({
  title,
  value,
  icon: Icon,
  description,
  color = 'blue',
  loading = false,
}: StatsCardProps) {
  const colors = colorMap[color];

  return (
    <div className={clsx(
      'rounded-xl p-5 border border-border bg-white shadow-card',
      'hover:shadow-md transition-shadow duration-200'
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-text-muted mb-1">{title}</p>
          {loading ? (
            <div className="h-8 w-16 bg-surface-alt animate-pulse rounded" />
          ) : (
            <p className="text-3xl font-bold text-text-primary">{value}</p>
          )}
          {description && (
            <p className="text-xs text-text-muted mt-1">{description}</p>
          )}
        </div>
        <div className={clsx('p-3 rounded-xl', colors.iconBg)}>
          <Icon size={22} className={colors.icon} />
        </div>
      </div>
    </div>
  );
}
