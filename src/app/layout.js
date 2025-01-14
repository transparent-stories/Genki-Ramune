import { AOSInit } from '@/utils/aos';
import '../app/globals.css';
import Providers from './providers';
import Link from 'next/link';
import { Sora } from 'next/font/google'
import _customFont from '@/app/font'
import Footer from '@/components/Global/Footer';

const _sora = Sora({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  varibale: '--font-sora'
})

export const metadata = {
  title: 'Genki Ramune',
  description: 'Refreshing soda drinks for all ages!',
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <AOSInit />
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Providers>
          <header className="p-4  bg-green text-white">
            <Link href='/'>Genki Ramune</Link>
            <div className='flex gap-10'>
              <Link href='/distributor'>Distributor</Link>
              <Link href='/contact'>Contact</Link>
              <Link href='/about-us'>About</Link>
              <Link href='/gallery'>Gallery</Link>
            </div>

          </header>
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
