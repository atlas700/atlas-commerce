import { UserButton } from "@clerk/nextjs";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { getCurrentUser } from "@/services/clerk/lib/getSession";

export async function Header() {
  const { role } = await getCurrentUser(true);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 p-2 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-white dark:text-slate-900" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
              Luxora
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              New Arrivals
            </Link>
            <Link
              href="/products"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              Products
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              Orders
            </Link>
            {role === "ADMIN" && (
              <Link
                href="/dashboard"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
              >
                Dashboard
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  );
}
