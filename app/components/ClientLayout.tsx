'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin') && pathname !== '/admin/login';

  if (isAdminRoute) {
    return <main className="flex-grow">{children}</main>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}