import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Helsinki City Bike App",
  description: "Helsinki City Bike App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
