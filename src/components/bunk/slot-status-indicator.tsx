import type { Slot } from '@/lib/types';
import { Zap, AlertTriangle, Wrench } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SlotStatusIndicatorProps {
  slot: Slot;
  size?: 'sm' | 'md';
}

export function SlotStatusIndicator({ slot, size = 'md' }: SlotStatusIndicatorProps) {
  const baseClasses = "flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold transition-colors";
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  const getStatusStyles = () => {
    switch (slot.status) {
      case 'available':
        return {
          icon: <Zap className={cn("h-4 w-4", size === 'sm' ? 'h-3 w-3' : '')} />,
          text: 'Available',
          className: 'bg-green-100 text-green-700 border-green-300 dark:bg-green-700 dark:text-green-100 dark:border-green-500',
          badgeVariant: 'default' as const, // Use explicit type
        };
      case 'occupied':
        return {
          icon: <AlertTriangle className={cn("h-4 w-4", size === 'sm' ? 'h-3 w-3' : '')} />,
          text: 'Occupied',
          className: 'bg-red-100 text-red-700 border-red-300 dark:bg-red-700 dark:text-red-100 dark:border-red-500',
          badgeVariant: 'destructive' as const,
        };
      case 'maintenance':
        return {
          icon: <Wrench className={cn("h-4 w-4", size === 'sm' ? 'h-3 w-3' : '')} />,
          text: 'Maintenance',
          className: 'bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-600 dark:text-yellow-100 dark:border-yellow-500',
          badgeVariant: 'secondary' as const,
        };
      default:
        return {
          icon: <AlertTriangle className={cn("h-4 w-4", size === 'sm' ? 'h-3 w-3' : '')} />,
          text: 'Unknown',
          className: 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500',
          badgeVariant: 'outline' as const,
        };
    }
  };

  const { icon, text, className: statusClassName } = getStatusStyles();

  return (
    <div className={cn(baseClasses, sizeClasses[size], statusClassName, 'border')}>
      {icon}
      <span className="hidden sm:inline">{slot.name} - </span>
      <span>{text}</span>
      {slot.type && <Badge variant="outline" className="ml-auto hidden md:inline-flex">{slot.type}</Badge>}
    </div>
  );
}
