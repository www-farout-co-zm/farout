import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

type MainLayoutProps = {
  children: ReactNode;
  className?: string;
};

const MainLayout = ({ children, className = '' }: MainLayoutProps) => {
  return (
    <div className="font-sans flex flex-col min-h-screen">
      <Navbar />
      <main className={`flex-grow ${className}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
