import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title: string;
  description: string;
  brandName?: string;
  discountValue?: string;
}

export function MetaTags({ title, description, brandName, discountValue }: MetaTagsProps) {
  const seoTitle = brandName && discountValue
    ? `${brandName} Discount Code - ${discountValue} Off | RetailCrew`
    : `${title} | RetailCrew`;

  const seoDescription = brandName && discountValue
    ? `Get ${discountValue} off at ${brandName}. Exclusive discounts for retail and ecommerce professionals. Join RetailCrew to access this and hundreds of other offers.`
    : description;

  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
    </Helmet>
  );
}