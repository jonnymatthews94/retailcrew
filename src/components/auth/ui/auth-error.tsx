interface AuthErrorProps {
  error: string | null;
}

export function AuthError({ error }: AuthErrorProps) {
  if (!error) return null;

  return (
    <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
      {error}
    </div>
  );
}