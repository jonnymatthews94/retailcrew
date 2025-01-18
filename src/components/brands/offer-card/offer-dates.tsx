interface OfferDatesProps {
  startDate: string;
  expiryDate: string;
}

export function OfferDates({ startDate, expiryDate }: OfferDatesProps) {
  return (
    <div className="text-right">
      <p className="text-sm text-gray-500">Valid until:</p>
      <p className="mt-1 font-medium">{new Date(expiryDate).toLocaleDateString()}</p>
      <p className="mt-1 text-xs text-gray-500">
        Started {new Date(startDate).toLocaleDateString()}
      </p>
    </div>
  );
}