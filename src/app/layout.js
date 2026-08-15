import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "BIOTECH ANIMATED KUMAR — Engineering Biology. Advancing Life.",
  description: "Where biological science meets intelligent technology. Discover BIOTECH ANIMATED KUMAR's living laboratory, genomic intelligence platforms, molecular discovery, and precision medicine.",
  keywords: ["biotechnology", "genomics", "bioinformatics", "molecular biology", "precision medicine", "AI biology", "DNA research"],
  authors: [{ name: "BIOTECH ANIMATED KUMAR" }],
  openGraph: {
    title: "BIOTECH ANIMATED KUMAR — Engineering Biology. Advancing Life.",
    description: "Cinematic, futuristic biotechnology experience combining genetics, technology, medicine, and living laboratory research.",
    url: "",
    siteName: "BIOTECH ANIMATED KUMAR",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BIOTECH ANIMATED KUMAR — Engineering Biology. Advancing Life.",
    description: "Cinematic, futuristic biotechnology experience combining genetics, technology, medicine, and living laboratory research.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#040E2B] text-slate-100 font-sans selection:bg-[#00D4FF] selection:text-[#040E2B]">
        {children}
      </body>
    </html>
  );
}
