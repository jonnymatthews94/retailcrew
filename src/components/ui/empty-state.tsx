import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="rounded-lg border-2 border-dashed border-gray-200 p-12 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-50">
        <Icon className="h-10 w-10 text-gray-400" />
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
      {action && (
        <Link
          to={action.href}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}