import { Inter } from "next/font/google";
import "./globals.css";
import { Header, Footer, AuthWrapper } from "@/components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "BookVenue",
  description: "BookVenue is a platform for booking venues for events",
  icons: {
    icon: "/logo.svg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={ inter.className}>
      <AuthWrapper>
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:px-7 lg:px-8">
          {children}
        </main>
        <Footer />
        <ToastContainer />
      </AuthWrapper>
      </body>
    </html>
  );
}
