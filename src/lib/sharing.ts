export function getBrandUrl(brandName: string): string {
  return `https://retailcrew.com/brands/${brandName?.toLowerCase().replace(/\s+/g, '')}`;
}

export function getEmailShareContent(brandName?: string, discountValue?: string) {
  const subject = `${discountValue} off at ${brandName} - Exclusive RetailCrew Offer`;
  const body = `Hey,

I thought you might be interested in this exclusive ${discountValue} discount at ${brandName} I found through RetailCrew.

You can access it here: ${getBrandUrl(brandName || '')}

RetailCrew is a community for retail professionals that gives us access to hundreds of exclusive discounts. The more of us that join, the more discounts we can unlock!

Best`;

  return { subject, body };
}

export function getSlackShareContent(brandName?: string, discountValue?: string) {
  return {
    text: `I just found this exclusive ${discountValue} discount at ${brandName} through RetailCrew! 🎉`,
    url: getBrandUrl(brandName || '')
  };
}