'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { navigation, siteConfig, announcementMessages } from '@/data/site-content'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [announcementVisible, setAnnouncementVisible] = useState(true)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const showTransparent = isHome && !scrolled

  // Announcement bar content
  const announcementText = announcementMessages.join('     ·     ')
  const marqueeContent = `${announcementText}     ·     ${announcementText}     ·     `

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* Announcement Bar */}
        {announcementVisible && (
          <div className="bg-burgundy text-cream overflow-hidden">
            <div className="flex items-center">
              <div className="flex-1 overflow-hidden py-2">
                <div className="animate-marquee whitespace-nowrap">
                  <span className="font-sans text-[11px] tracking-[2px] uppercase">
                    {marqueeContent}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setAnnouncementVisible(false)}
                className="px-3 py-2 text-cream/60 hover:text-cream transition-colors flex-shrink-0"
                aria-label="Close announcement"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Navbar */}
        <nav
          className={`transition-all duration-400 ${
            showTransparent
              ? 'py-4'
              : 'py-1.5 bg-cream/[0.97] backdrop-blur-md border-b border-light-gray'
          }`}
        >
          <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center">
            {/* Logo — fully colorized on hero for visibility, transparent-bg on scrolled */}
            <Link href="/" className="flex items-center no-underline flex-shrink-0">
              {showTransparent ? (
                <Image
                  src="/images/fully-colorized-logo.png"
                  alt="Fig Jam Charcuterie"
                  width={300}
                  height={300}
                  className="h-[105px] w-auto object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)] transition-all duration-400"
                />
              ) : (
                <Image
                  src="/images/colorized-logo-transparent-bcgrnd.png"
                  alt="Fig Jam Charcuterie"
                  width={300}
                  height={255}
                  className="h-[100px] w-auto object-contain transition-all duration-400"
                />
              )}
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-5">
              {navigation.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`font-sans text-[12px] font-semibold tracking-[1.5px] uppercase no-underline transition-colors duration-300 whitespace-nowrap ${
                      isActive
                        ? 'text-gold border-b-2 border-gold pb-0.5'
                        : showTransparent
                          ? 'text-white hover:text-gold'
                          : 'text-charcoal hover:text-burgundy'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <Link
                href="/contact"
                className="inline-block px-5 py-2.5 bg-gold text-white font-sans text-[11px] font-semibold uppercase tracking-[2px] rounded-sm transition-all duration-300 hover:bg-gold-light hover:shadow-lg whitespace-nowrap"
              >
                Order Now
              </Link>
            </div>

            {/* Phone + Mobile toggle */}
            <div className="flex items-center gap-4 lg:hidden">
              <a
                href={siteConfig.phoneLink}
                className={`transition-colors ${showTransparent ? 'text-white' : 'text-burgundy'}`}
              >
                <Phone size={20} />
              </a>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`transition-colors ${showTransparent ? 'text-white' : 'text-charcoal'}`}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Desktop phone — large and bold */}
            <a
              href={siteConfig.phoneLink}
              className={`hidden lg:flex items-center gap-2 font-sans text-base font-bold tracking-[1px] no-underline transition-colors whitespace-nowrap flex-shrink-0 ${
                showTransparent ? 'text-white' : 'text-burgundy'
              }`}
            >
              <Phone size={18} />
              {siteConfig.phone}
            </a>
          </div>
        </nav>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-burgundy flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-10"
            >
              <Image
                src="/images/fully-colorized-logo.png"
                alt="Fig Jam Charcuterie"
                width={300}
                height={300}
                className="h-[130px] w-auto object-contain"
              />
            </motion.div>

            <nav className="flex flex-col items-center gap-8">
              {navigation.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.15 }}
                >
                  <Link
                    href={link.href}
                    className={`font-sans text-sm font-semibold tracking-[3px] uppercase no-underline transition-colors ${
                      pathname === link.href ? 'text-gold' : 'text-cream/70 hover:text-cream'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <a
                  href={siteConfig.phoneLink}
                  className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-gold text-white font-sans text-xs font-semibold uppercase tracking-[2px] rounded-sm"
                >
                  <Phone size={16} />
                  {siteConfig.phone}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
