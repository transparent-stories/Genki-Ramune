import '../app/globals.css';
import Providers from './providers'; // Import the new client component

export const metadata = {
  title: 'Genki Ramune',
  description: 'Refreshing soda drinks for all ages!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
