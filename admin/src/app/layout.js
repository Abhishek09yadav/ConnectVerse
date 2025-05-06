import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import AdminSidebar from "./components/AdminSidebar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Admin",
  description: "Find Hobby Admin Panel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PrimeReactProvider value={{ ripple: true }}>
          <AdminSidebar/>
          {children}
        </PrimeReactProvider>
      </body>
    </html>
  );
}
