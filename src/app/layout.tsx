import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import OgImage from '../../public/og.jpg';
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'CryptoBot | AI Chatbot for Cryptocurrency',
  description:
    'CryptoBot is an AI chatbot that specializes in cryptocurrency topics. Ask CryptoBot about the latest prices and can send you email!',
  metadataBase: new URL('https://cryptobot.pragusga.com'),
  authors: [
    {
      name: 'Taufik Pragusga',
      url: 'https://pragusga.com',
    },
  ],
  abstract:
    'CryptoBot is an AI chatbot that specializes in cryptocurrency topics.',
  applicationName: 'CryptoBot',
  alternates: {
    canonical: 'https://cryptobot.pragusga.com',
  },
  category: 'Technology',
  openGraph: {
    type: 'website',
    emails: ['taufik@pragusga.com'],
    title: 'CryptoBot | AI Chatbot for Cryptocurrency',
    description:
      'CryptoBot is an AI chatbot that specializes in cryptocurrency topics. Ask CryptoBot about the latest prices and can send you email!',
    siteName: 'CryptoBot',
    countryName: 'Indonesia',
    url: 'https://cryptobot.pragusga.com',
    alternateLocale: 'id_ID',
    images: [
      {
        url: `${OgImage.src}`,
        width: 1200,
        height: 630,
        alt: 'CryptoBot | AI Chatbot for Cryptocurrency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@cryptobot',
    title: 'CryptoBot | AI Chatbot for Cryptocurrency',
    creator: '@pragusga',
    description:
      'CryptoBot is an AI chatbot that specializes in cryptocurrency topics. Ask CryptoBot about the latest prices and can send you email!',
    images: [
      {
        url: `${OgImage.src}`,
        width: 1200,
        height: 630,
        alt: 'CryptoBot | AI Chatbot for Cryptocurrency',
      },
    ],
  },
  keywords: [
    'cryptobot',
    'chatbot',
    'cryptocurrency',
    'ai',
    'artificial',
    'crypto',
    'bot',
  ],
  appLinks: {
    web: {
      url: 'https://cryptobot.pragusga.com',
      should_fallback: false,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
