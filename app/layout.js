// app/layout.js
import { Lato, Open_Sans } from 'next/font/google';
import './globals.css';

export const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-lato',
});

export const open_sans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-open-sans',
});

export const metadata = {
  title: 'School Project',
  description: 'A Next.js and MySQL project to manage school data.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lato.variable} ${open_sans.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}