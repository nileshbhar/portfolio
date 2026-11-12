import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { personal, site, socials } from "@/data/personal";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s · ${personal.name}`,
  },
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: personal.name, url: site.url }],
  creator: personal.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: personal.name,
    title: site.title,
    description: site.description,
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    ...(site.twitterHandle ? { creator: site.twitterHandle } : {}),
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.name,
  jobTitle: personal.title,
  url: site.url,
  sameAs: [socials.github, socials.linkedin].filter(Boolean),
  knowsAbout: ["Laravel", "PHP", "React", "Next.js", "Node.js", "MySQL", "MongoDB", "AWS"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <div id="top" />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
