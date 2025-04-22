'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HeartIcon, SearchIcon, ShoppingBagIcon, UserIcon, MenuIcon, XIcon } from 'lucide-react'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="w-full">
      {/* Top Header */}
      <div className="bg-black text-white">
        <div className="container mx-auto px-6 py-2">
          <div className="flex justify-between items-center">
            {/* Language Selector */}
            <div className="flex space-x-2 flex-1">
              <button className="hover:text-gray-300 text-sm">EN</button>
              <span className="text-sm">/</span>
              <button className="hover:text-gray-300 text-sm">VNI</button>
            </div>

            {/* Welcome Message */}
            <div className="hidden md:block text-center flex-1">
              <p className="text-sm font-medium">Welcome to the Shop</p>
            </div>
            
            {/* Right Links */}
            <div className="flex space-x-4 flex-1 justify-end">
              <Link href="/contact" className="hover:text-gray-300 text-sm">
                Contact
              </Link>
              <Link href="/about" className="hover:text-gray-300 text-sm">
                About
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden hover:text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <XIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>

          {/* Navigation Links - Hidden on Mobile */}
          <nav className="hidden lg:flex space-x-6 uppercase">
            <Link href="/products" className="hover:text-gray-600">
              Products
            </Link>
            <Link href="/collections" className="hover:text-gray-600">
              Collections
            </Link>
            <Link href="/new-arrivals" className="hover:text-gray-600">
              New Arrivals
            </Link>
          </nav>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <div className="relative w-28 h-10 lg:w-32 lg:h-12">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center">
            <button className="hover:text-gray-600 p-2">
              <SearchIcon className="w-5 h-5" />
            </button>
            <button className="hover:text-gray-600 p-2 hidden lg:block">
              <UserIcon className="w-5 h-5" />
            </button>
            <button className="hover:text-gray-600 p-2 hidden lg:block">
              <HeartIcon className="w-5 h-5" />
            </button>
            <button className="hover:text-gray-600 p-2">
              <ShoppingBagIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-white">
            <div className="container mx-auto px-6 py-8">
              <div className="flex justify-end">
                <button 
                  className="hover:text-gray-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <XIcon className="w-6 h-6" />
                </button>
              </div>
              
              <nav className="mt-8 space-y-6 flex flex-col items-center">
                <Link 
                  href="/products" 
                  className="text-xl hover:text-gray-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Products
                </Link>
                <Link 
                  href="/collections" 
                  className="text-xl hover:text-gray-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Collections
                </Link>
                <Link 
                  href="/new-arrivals" 
                  className="text-xl hover:text-gray-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  New Arrivals
                </Link>
                <div className="flex space-x-6 mt-6">
                  <button className="hover:text-gray-600">
                    <UserIcon className="w-6 h-6" />
                  </button>
                  <button className="hover:text-gray-600">
                    <HeartIcon className="w-6 h-6" />
                  </button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header