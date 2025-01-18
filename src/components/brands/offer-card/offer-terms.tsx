interface OfferTermsProps {
  terms: string[];
}

export function OfferTerms({ terms }: OfferTermsProps) {
  if (terms.length === 0) return null;

  return (
    <div className="mt-4 border-t pt-4">
      <p className="text-sm font-medium text-gray-900">Terms & Conditions:</p>
      <ul className="mt-2 space-y-1">
        {terms.map((term, index) => (
          <li key={index} className="text-sm text-gray-600">
            • {term}
          </li>
        ))}
      </ul>
    </div>
  );
}