import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

export const metadata = {
  title: 'SoundHouse - Premium Music Learning',
  description: 'Live, practical music classes for beginners, hobbyists, and future performers. Learn from working musicians.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased relative min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
