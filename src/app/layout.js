import '../app/globals.css';
import Providers from './providers'; // Import the new client component

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        {/* Add Google Font (Sora) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" integrity="sha512-1cK78a1o+ht2JcaW6g8OXYwqpev9+6GqOkz9xmBN9iUUhIndKtxwILGWYOSibOKjLsEdjyjZvYDq/cZwNeak0w==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
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
        <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
        <script>
          AOS.init();
        </script>
      </body>
    </html>
  );
}
