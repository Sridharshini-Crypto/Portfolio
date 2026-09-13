import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#050807',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Sridharshini S | Computer Science & Cyber Security Student',
  description:
    'Portfolio of Sridharshini S, a Computer Science and Engineering student specializing in Cyber Security at Chennai Institute of Technology. Exploring cybersecurity, networking, artificial intelligence, and software development.',
  keywords: [
    'Sridharshini S',
    'Sridharshini Portfolio',
    'Cyber Security Student',
    'Chennai Institute of Technology',
    'HAL Aerothon 2026',
    'SubAero Digital Twin',
    'ReguShield AI',
    'SentinelX Cyber Fusion',
    'FinSight AI',
    'LangGraph',
    'Zero Trust',
    'Full Stack Developer',
  ],
  authors: [{ name: 'Sridharshini S', url: 'https://github.com/Sridharshini-Crypto' }],
  creator: 'Sridharshini S',
  publisher: 'Sridharshini S',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Sridharshini S | The Technical Exploration',
    description:
      'Computer Science & Cyber Security student at Chennai Institute of Technology. Exploring technology through curiosity and problem-solving.',
    siteName: 'Sridharshini S Portfolio',
    images: [
      {
        url: '/projects/subaero.png',
        width: 1200,
        height: 630,
        alt: 'Sridharshini S — Technical Exploration Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sridharshini S | The Technical Exploration',
    description:
      'Computer Science & Cyber Security student at Chennai Institute of Technology. Exploring technology through curiosity and problem-solving.',
    images: ['/projects/subaero.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sridharshini S',
    jobTitle: 'Computer Science and Engineering (Cyber Security) Student',
    worksFor: {
      '@type': 'EducationalOrganization',
      name: 'Chennai Institute of Technology',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Chennai Institute of Technology',
    },
    sameAs: [
      'https://www.linkedin.com/in/sridharshini-s/',
      'https://github.com/Sridharshini-Crypto',
    ],
    knowsAbout: [
      'Cybersecurity',
      'Zero-Trust Architecture',
      'Networking Protocols',
      'Artificial Intelligence',
      'Physics-Informed Machine Learning',
      'Full-Stack Software Development',
      'LangGraph',
      'Digital Twins',
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} scroll-smooth antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window !== 'undefined') {
                  const cleanup = function() {
                    try {
                      document.querySelectorAll('nextjs-portal, [data-nextjs-toast], [data-nextjs-dev-indicator], #nextjs-dev-overlay').forEach(function(el) {
                        el.style.display = 'none';
                        el.style.visibility = 'hidden';
                        el.remove();
                      });
                    } catch (e) {}
                  };
                  window.addEventListener('DOMContentLoaded', cleanup);
                  setInterval(cleanup, 1500);
                }
              })();
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#050807] text-[#F4FBF7] selection:bg-[#059669] selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}
