import Nav from "@/components/Nav";
import "../styles/globals.css";
// import { DataProvider } from "@/utils/GlobalState";
import { AuthContextProvider } from "@/context/AuthContext";

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
        </body>
      </AuthContextProvider>
    </html>
  );
}
