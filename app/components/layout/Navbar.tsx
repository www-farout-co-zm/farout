import Link from 'next/link';
import { CartPreview } from '../cart/CartPreview';
import { SearchBar } from '@/components/search/SearchBar';
import AnimatedLogo from '@/components/ui/AnimatedLogo';

export default function Navbar() {
  return (
    <nav className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <AnimatedLogo />
        
        <div className="hidden md:flex space-x-6">
          <Link href="/shop" className="hover:text-gray-300">Shop</Link>
          <Link href="/new-arrivals" className="hover:text-gray-300">New Arrivals</Link>
          <Link href="/sale" className="hover:text-gray-300">Sale</Link>
          <Link href="/about" className="hover:text-gray-300">About</Link>
        </div>
        
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <SearchBar />
        </div>
        
        <div className="flex items-center space-x-4">
          <Link href="/search" className="md:hidden hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Link>
          <Link href="/account" className="hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>
          <CartPreview />
        </div>
      </div>
    </nav>
  );
}
