import { AOSInit } from '@/utils/aos';
import '../app/globals.css';
import Providers from './providers';
import Link from 'next/link';

export const metadata = {
  title: 'Genki Ramune',
  description: 'Refreshing soda drinks for all ages!',
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <AOSInit />
      <head>
        {/* Add Google Font (Sora) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Providers>
          <header className="p-4 bg-blue-500 text-white">
            <Link href='/'>Genki Ramune</Link>
          </header>
          <main>{children}</main>
          <footer className="p-4 bg-gray-800 text-white">
            <p>© 2024 Genki Ramune</p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
