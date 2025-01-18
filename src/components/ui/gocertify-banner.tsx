import { ShieldCheck } from 'lucide-react';

export function GoCertifyBanner() {
  return (
    <div className="bg-primary-50/50 border-t border-b border-primary-100">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-2 text-sm">
          <ShieldCheck className="h-4 w-4 text-primary-600" />
          <span className="text-gray-600">
            Powered by{' '}
            <a
              href="https://gocertify.me?utm_source=retailcrew&utm_medium=banner&utm_campaign=powered_by"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline font-medium"
            >
              Gocertify
            </a>
            {' '}— helping brands run smart & meaningful offers
          </span>
        </div>
      </div>
    </div>
  );
}