import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";
import BootstrapClient from "./BootstrapClient"; // Ensure this is imported
import localFont from "next/font/local";
import Navbar from "@/components/navbar/Navbar";
import { NeonTunnel } from "@/components/sections/hero/NeonTunnel";


export const metadata = {
  title: "Nadir Kutluozen",
  description: "FullStack Software Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <ThemeProvider>
          <NeonTunnel />
          <Navbar />
          {children}
          <BootstrapClient />
        </ThemeProvider>
      </body>
    </html>
  );
}
