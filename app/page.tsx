'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import LogoAnimation from '@/components/ui/LogoAnimation';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Hero Section */}
      <div className="relative h-screen">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.jpg" // Replace with your actual image path
            alt="FAR-OUT DECKS"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-8 text-white">
          {/* Top Navigation */}
          <header className="flex justify-between items-center">
            <div className="text-2xl font-bold">FAR-OUT</div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/shop" className="hover:underline">SHOP</Link>
              <Link href="/collections" className="hover:underline">COLLECTIONS</Link>
              <Link href="/about" className="hover:underline">ABOUT</Link>
              <Link href="/contact" className="hover:underline">CONTACT</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/search" className="hover:opacity-80">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Link>
              <Link href="/account" className="hover:opacity-80">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
              <Link href="/cart" className="hover:opacity-80 relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-white text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">0</span>
              </Link>
            </div>
          </header>
          
          {/* Animated Logo */}
          <div className="relative w-full max-w-3xl h-64 md:h-96 mx-auto mb-8">
            <LogoAnimation />
          </div>
          <p className="text-xl md:text-2xl text-center mb-12">SKATEBOARD DECKS</p>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Premium skateboard decks designed for riders who push boundaries and break limits.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-white hover:bg-gray-100 text-black px-8 py-6 text-lg">
              <Link href="/shop">SHOP NOW</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
              <Link href="/collections">VIEW COLLECTION</Link>
            </Button>
          </div>
          
          {/* Bottom Navigation */}
          <footer className="flex flex-col md:flex-row justify-between items-center text-sm text-white/80">
            <div className="mb-4 md:mb-0">© 2025 FAR-OUT. All rights reserved.</div>
            <div className="flex flex-wrap justify-center gap-4 mb-4 md:mb-0">
              <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white">Terms of Service</Link>
              <Link href="/shipping" className="hover:text-white">Shipping & Returns</Link>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </footer>
        </div>
      </div>
      
      {/* About Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">About FAR OUT</h2>
            <p className="text-lg mb-8">
              Founded in 2022, FAR OUT is dedicated to pushing the boundaries of skateboarding culture. 
              We create high-quality products that inspire and enable riders to express themselves.
            </p>
            <Link 
              href="/about" 
              className="inline-block border-2 border-white px-8 py-3 font-semibold hover:bg-white hover:text-black transition-colors"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
