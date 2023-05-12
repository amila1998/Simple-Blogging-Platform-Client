import Image from "next/image";
import Link from "next/link";
import "../styles/globals.css";
import { DataProvider } from "@/utils/GlobalState";
import Nav from "@/components/Nav";

export const metadata = {
  title: "Sample Blog Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">
          <DataProvider>
            <Nav />
            {children}
          </DataProvider>
        </main>
      </body>
    </html>
  );
}