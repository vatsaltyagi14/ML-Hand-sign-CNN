import { Inter } from "next/font/google";
import "@/assets/styles/globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Spero AI - Your Virtual Therapist",
  description: "An empathetic AI companion for mental wellness.",
};


const Layout = ({children}) => {
  return ( 
    <html lang="en">
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
   );
}
 
export default Layout;