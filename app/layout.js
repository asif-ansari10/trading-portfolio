import "./globals.css";
import NavBar from "@/components/NavBar";
import { Providers } from "./providers";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Trading Portfolio",
  description: "Track your trading performance",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-100 dark:bg-[#0b1220] text-gray-900 dark:text-gray-200">

        <Providers>
          <NavBar />
          <Toaster position="top-center" reverseOrder={false} />
          <main className="pt-20 max-w-7xl mx-auto px-4">
            {children}
          </main>
          <Footer/>
        </Providers>

      </body>
    </html>
  );
}
