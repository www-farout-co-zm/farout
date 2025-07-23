'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AnimatedLogo() {
  const [colorIndex, setColorIndex] = useState(0);
  const colors = [
    'text-red-500',
    'text-blue-500',
    'text-green-500',
    'text-yellow-500',
    'text-purple-500',
    'text-pink-500',
    'text-indigo-500',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 2000); // Change color every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Link 
      href="/" 
      className={`text-2xl font-bold transition-colors duration-2000 ${colors[colorIndex]} hover:opacity-80`}
    >
      FAR OUT
    </Link>
  );
}
