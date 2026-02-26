import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";
import BootstrapClient from "./BootstrapClient"; // Ensure this is imported
import Navbar from "@/components/navbar/Navbar";
import { NeonTunnel } from "@/components/sections/hero/NeonTunnel";
import PageLoader from "@/components/ui/PageLoader";
import Footer from "@/components/ui/Footer";

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
      <body className="" suppressHydrationWarning>
        <ThemeProvider>
          <PageLoader />
          <NeonTunnel />
          <Navbar />
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <main style={{ flex: '1' }}>
              {children}
            </main>
            <Footer />
          </div>
          <BootstrapClient />
        </ThemeProvider>
      </body>
    </html>
  );
}
