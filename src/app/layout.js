'use client';
import { useEffect } from 'react';
import '../app/globals.css';
import Providers from './providers'; // Import the new client component
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function RootLayout({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    })
  }, [])

  return (
    <html lang="en">
      <head>
        {/* Add Google Font (Sora) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body>
        <Providers>
          <header className="p-4 bg-blue-500 text-white">
            <h1>Genki Ramune</h1>
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
