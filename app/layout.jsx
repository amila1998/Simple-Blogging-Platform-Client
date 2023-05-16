import Nav from "@/components/Nav";
import "../styles/globals.css";
// import { DataProvider } from "@/utils/GlobalState";
import { AuthContextProvider } from "@/context/AuthContext";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Sample Blog Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthContextProvider>
        <body>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
          <Footer/>
        </body>
      </AuthContextProvider>
    </html>
  );
}
