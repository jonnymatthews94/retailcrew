export function normalizeWebsite(url: string): string {
  if (!url) return '';
  
  // Add protocol if missing
  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }

  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace(/^www\./, '');
  } catch {
    return url.replace(/^https?:\/\/(www\.)?/i, '').replace(/\/$/, '');
  }
}