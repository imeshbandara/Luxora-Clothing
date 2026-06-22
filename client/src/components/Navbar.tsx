import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { Bell, Home, ShoppingCart } from "lucide-react";
import ShoppingCartIcon from "./ShoppingCartIcon";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between border-b border-gray-200 dark:border-zinc-800 pb-4">
      {/* LEFT */}
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          alt="Luxora-Clothing"
          width={36}
          height={36}
          className="w-6 h-6 md:w-9 md:h-9"
        />
        <p className="hidden md:block text-md font-medium tracking-wider text-zinc-900 dark:text-zinc-100">
         Luxora-Clothing.
        </p>
      </Link>
      {/* RIGHT */}
      <div className="flex items-center gap-6">
        <SearchBar />
        <ThemeToggle />
        <Link href="/">
          <Home className="w-4 h-4 text-gray-600 dark:text-zinc-400"/>
        </Link>
        <Bell className="w-4 h-4 text-gray-600 dark:text-zinc-400"/>
        <ShoppingCartIcon/>
        <Link href="/login" className="text-zinc-900 dark:text-zinc-100 hover:underline">Sign in</Link>
      </div>
    </nav>
  );
};

export default Navbar;
