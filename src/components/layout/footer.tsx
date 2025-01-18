import { ShoppingBag, Twitter, Linkedin, Instagram, ArrowRight, Chrome } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ChromeExtensionDialog } from '../ui/chrome-extension-dialog';
import { GoCertifyBanner } from '../ui/gocertify-banner';
import { useState } from 'react';

const footerLinks = {
  'About Us': [
    { name: 'About RetailCrew', href: '/about' },
    { name: 'How it Works', href: '/how-it-works' },
    { name: 'Contact Us', href: '/contact' },
    { 
      name: 'Get Support', 
      href: 'mailto:marketplace@gocertify.me?subject=RetailCrew Support Request' 
    },
  ],
  'Legal': [
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
  'Categories': [
    { name: 'Fashion', href: '/category/fashion' },
    { name: 'Tech', href: '/category/tech' },
    { name: 'Beauty', href: '/category/beauty' },
    { name: 'Home', href: '/category/home' },
    { name: 'Travel', href: '/category/travel' },
  ],
};

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/retailcrew' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/retailcrew' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/retailcrew' },
];

export function Footer() {
  const [showChromeDialog, setShowChromeDialog] = useState(false);

  return (
    <footer>
      <GoCertifyBanner />
      
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-2">
                <ShoppingBag className="h-6 w-6 text-primary-600" />
                <span className="text-xl font-bold">RetailCrew</span>
              </Link>
              <p className="mt-4 text-sm text-gray-600">
                Exclusive discounts for ecommerce professionals.
              </p>
              <div className="mt-6 flex gap-4">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-gray-400 hover:text-primary-600"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="h-5 w-5" />
                      <span className="sr-only">{link.name}</span>
                    </a>
                  );
                })}
              </div>

              <button
                onClick={() => setShowChromeDialog(true)}
                className="mt-6 flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 rounded-lg border px-4 py-2 hover:border-primary-600 transition-colors"
              >
                <Chrome className="h-5 w-5" />
                <span>Chrome Extension Coming Soon</span>
              </button>
            </div>

            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="font-semibold text-gray-900">{category}</h3>
                <ul className="mt-4 space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      {link.href.startsWith('mailto:') ? (
                        <a
                          href={link.href}
                          className="text-sm text-gray-600 hover:text-primary-600"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="text-sm text-gray-600 hover:text-primary-600"
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="font-semibold text-gray-900">List Your Brand</h3>
              <p className="mt-4 text-sm text-gray-600">
                Join our community of retailers offering exclusive discounts.
              </p>
              <Link
                to="/list-your-brand"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:border-primary-600 hover:text-primary-600"
              >
                List your offer
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-12 border-t pt-8">
            <p className="text-center text-sm text-gray-500">
              © {new Date().getFullYear()} RetailCrew. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      <ChromeExtensionDialog 
        open={showChromeDialog} 
        onClose={() => setShowChromeDialog(false)} 
      />
    </footer>
  );
}