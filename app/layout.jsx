import { Poppins } from "next/font/google";
import Link from "next/link";
import "@/assets/styles/globals.css"; // Assumes globals.css is in the app/ directory

// Configure the Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Include weights you'll use
});

export const metadata = {
  title: "Spero AI - Your Virtual Therapist",
  description: "An empathetic AI companion for mental wellness.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        
        <header className="absolute top-0 left-0 w-full z-20 p-4">
            <nav className="max-w-7xl mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-[--color-brand-indigo]">
                    Spero
                </Link>
                <div className="flex items-center gap-4">
                    <Link href="/login" className="text-sm font-medium text-[--color-brand-gray] hover:text-[--color-brand-indigo]">
                        Log In
                    </Link>
                    <Link href="/register" className="px-4 py-2 text-sm font-medium text-white bg-[--color-brand-accent] rounded-full hover:opacity-90 transition-opacity">
                        Get Started
                    </Link>
                </div>
            </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
