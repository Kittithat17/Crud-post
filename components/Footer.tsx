"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MapPin
} from "lucide-react";

const mainLinks = [
  {
    title: "Get Help",
    links: [
      { name: "Shoes", href: "/shoes" },
      { name: "Choose", href: "/select" },
      { name: "Accommodation Equipment", href: "/equipment" },
      { name: "Local Products", href: "/local-products" },
      { name: "Assistance", href: "/help" },
    ],
  },
  {
    title: "Order Status",
    links: [
      { name: "Shipping", href: "/shipping" },
      { name: "Printed", href: "/printed" },
      { name: "Payment Methods", href: "/payment" },
      { name: "Contact Us", href: "/contact" },
      { name: "Or Find Nike", href: "/search" },
    ],
  },
  {
    title: "About Us",
    links: [
      { name: "Payments", href: "/payment" },
      { name: "Careers", href: "/careers" },
      { name: "Investors", href: "/investors" },
      { name: "Sustainability", href: "/sustainability" },
      { name: "Find Jobs", href: "/hiring" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="flex bg-black text-white">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and social icons on mobile */}
          <div className="lg:hidden">
            <div className="flex space-x-4 mb-8">
              <Link href="https://facebook.com/nike" className="hover:text-gray-400">
                <Facebook size={20} />
              </Link>
              <Link href="https://twitter.com/nike" className="hover:text-gray-400">
                <Twitter size={20} />
              </Link>
              <Link href="https://instagram.com/nike" className="hover:text-gray-400">
                <Instagram size={20} />
              </Link>
              <Link href="https://youtube.com/nike" className="hover:text-gray-400">
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          {/* Main links */}
          {mainLinks.map((column) => (
            <div key={column.title}>
              <h3 className="font-bold mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Store locator */}
          <div>
            <h3 className="font-bold mb-4">Find a Store</h3>
            <p className="text-gray-400 text-sm mb-4">
              Find Nike stores in your country
            </p>
            <Link
              href="/stores"
              className="inline-flex items-center text-sm text-white font-medium hover:underline"
            >
              <MapPin size={16} className="mr-1" />
              Find Stores
            </Link>
          </div>

          {/* Logo and social icons on desktop */}
          <div className="hidden lg:block">
            <div className="flex space-x-4">
              <Link href="https://facebook.com/nike" className="hover:text-gray-400">
                <Facebook size={20} />
              </Link>
              <Link href="https://twitter.com/nike" className="hover:text-gray-400">
                <Twitter size={20} />
              </Link>
              <Link href="https://instagram.com/nike" className="hover:text-gray-400">
                <Instagram size={20} />
              </Link>
              <Link href="https://youtube.com/nike" className="hover:text-gray-400">
                <Youtube size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center text-xs text-gray-400">
          <div className="flex items-center mb-4 md:mb-0">
            <MapPin size={16} className="mr-2" /> Thailand
          </div>
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <Link href="/terms" className="hover:text-white">© 2025 Nike, Inc.</Link>
            <Link href="/terms" className="hover:text-white">Tax Information</Link>
            <Link href="/privacy" className="hover:text-white">Privacy Standards</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};