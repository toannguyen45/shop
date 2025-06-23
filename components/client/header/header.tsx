"use client";

import React from "react";
import Link from "next/link";
import { Button } from "../../ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";

const Header = () => {
  return (
    <header className="w-full border-b border-gray-200">
      {/* Top Header */}
      <div className="bg-black text-white">
        <div className="max-w-screen-xl mx-auto px-4 py-2">
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
      <nav className="h-16 bg-background border-b">
        <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4">
          <Logo />
          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />
          <div className="flex items-center gap-3">
            <Button variant="outline" className="hidden sm:inline-flex">
              Đăng Nhập
            </Button>
            <Button>Giỏ Hàng</Button>
            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
