import { Loader2 } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
}

export function AuthButton({ loading, children, className, ...props }: AuthButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={cn(
        "flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 disabled:opacity-50",
        className
      )}
      {...props}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : children}
    </button>
  );
}