import localFont from "next/font/local";
import "./globals.css";
import { UserProvider } from "./(root)/context/user.context";
import { Toaster } from "react-hot-toast";
import { preload } from "react-dom";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Sarwam",
  description: "Connecting people with opportunities.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster />
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
