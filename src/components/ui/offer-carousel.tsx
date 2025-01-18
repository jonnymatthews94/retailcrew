{/* Update offer cards hover state */}
{brands.map((brand) => (
  <Link
    key={brand.id}
    to={`/brands/${brand.id}`}
    className="flex-none w-[300px] group rounded-lg border p-6 hover:bg-primary-50 transition-colors"
  >
    <img
      src={brand.logo}
      alt={brand.name}
      className="h-16 w-16 rounded-lg object-contain"
    />
    <h3 className="mt-4 font-semibold text-gray-900">{brand.name}</h3>
    <p className="mt-1 text-sm text-gray-500">{brand.category}</p>
    {brand.offers[0] && (
      <p className="mt-2 text-primary-600">{brand.offers[0].discountValue}</p>
    )}
  </Link>
))}