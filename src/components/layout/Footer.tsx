import Link from 'next/link'
import Image from 'next/image'
import { navigation, siteConfig } from '@/data/site-content'
import { assetPath } from '@/lib/utils'

export default function Footer() {
  return (
    <footer className="bg-charcoal py-16 px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Image
                src={assetPath("/images/fully-colorized-logo.png")}
                alt="Fig Jam Charcuterie"
                width={200}
                height={200}
                className="h-[100px] w-auto object-contain"
              />
              <div>
                <span className="font-display text-xl font-semibold text-cream tracking-wide block">
                  FIG JAM
                </span>
                <span className="font-body text-sm text-white/40">
                  {siteConfig.tagline}
                </span>
              </div>
            </div>
            <p className="font-body text-base text-white/40 mt-3">
              {siteConfig.serviceArea}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-sans text-xs tracking-[3px] uppercase text-white/40 mb-4">
              Navigation
            </p>
            <nav className="flex flex-col gap-3">
              {navigation.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-base text-cream/70 no-underline hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans text-xs tracking-[3px] uppercase text-white/40 mb-4">
              Contact
            </p>
            <a
              href={siteConfig.phoneLink}
              className="font-display text-2xl text-gold no-underline hover:text-gold-light transition-colors block mb-4"
            >
              {siteConfig.phone}
            </a>
            <p className="font-body text-base text-white/40">
              Free delivery in the Sarasota area
            </p>
            <p className="font-body text-base text-white/40 mt-1">
              Fresh · Made to Order
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-sm text-white/30">
            &copy; {new Date().getFullYear()} {siteConfig.businessName}. All rights reserved.
          </p>
          <Image
            src={assetPath("/images/fully-colorized-logo.png")}
            alt="Fig Jam"
            width={40}
            height={40}
            className="opacity-40 hover:opacity-70 transition-opacity"
          />
        </div>
      </div>
    </footer>
  )
}
