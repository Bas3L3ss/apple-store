"use client";

import { useEffect, useRef, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
} from "@/src/components/ui/navigation-menu";
import { Button } from "@/src/components/ui/button";
import { Apple, Search, ShoppingBag, X } from "lucide-react";

import { cn } from "@/src/lib/utils";
import { Link, useNavigate, useLocation } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { useCartStore } from "../../store/useCartStore";
import MobileNav from "./mobile-nav";
import DesktopNav from "./desktop-nav";
import SeachDropDown from "./search-dropdown";
import ShoppingBagDropDown from "./shopping-bag-dropdown";

const navigationItems = [
  { name: "Store", href: "" },
  { name: "Mac", href: "macbook" },
  { name: "iPad", href: "ipad" },
  { name: "iPhone", href: "iphone" },
  { name: "AirPods", href: "airpods" },
  { name: "Watch", href: "apple_watch" },
  { name: "Accessories", href: "phonecase" },
];

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShoppingBagOpen, setIsShoppingBagOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const searchRef = useRef<HTMLDivElement | null>(null);
  const shoppingBagRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { guestItems, userItems } = useCartStore();
  const { isLoggedIn: isAuthenticated, logout, account } = useAuth();
  const items = isAuthenticated ? userItems : guestItems ?? [];
  const subtotal = items.reduce((total, item) => total + item.totalPrice, 0);

  // Close other dropdown when one is opened
  useEffect(() => {
    if (isSearchOpen) setIsShoppingBagOpen(false);
  }, [isSearchOpen]);

  useEffect(() => {
    if (isShoppingBagOpen) setIsSearchOpen(false);
  }, [isShoppingBagOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
        setIsShoppingBagOpen(false);
      }
    };
    const handleClick = (event: MouseEvent) => {
      if (!searchRef.current || !shoppingBagRef.current) return;

      const clientX = event.clientX;
      const clientY = event.clientY;

      if (isSearchOpen) {
        const { bottom, left, right } =
          searchRef.current.getBoundingClientRect();
        if (!(clientX > left && clientX < right && clientY < bottom)) {
          setIsSearchOpen(false);
        }
      }

      if (isShoppingBagOpen) {
        const { bottom, left, right } =
          shoppingBagRef.current.getBoundingClientRect();
        if (!(clientX > left && clientX < right && clientY < bottom)) {
          setIsShoppingBagOpen(false);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClick);
    };
  }, [isSearchOpen, isShoppingBagOpen]);

  useEffect(() => {
    setIsSearchOpen(false);
    setIsShoppingBagOpen(false);

    if (location.pathname != "/shop") {
      window.scrollTo(0, 0);
    }
  }, [location]);

  // Track scroll for glass effect enhancement
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="relative">
        <nav
          className={cn(
            "transition-all duration-300",
            isScrolled
              ? "bg-white/90 backdrop-blur-xl shadow-sm"
              : "bg-white/80 backdrop-blur-md"
          )}
        >
          <NavigationMenu className="mx-auto max-w-[1200px] flex items-center justify-between px-4 py-3">
            <MobileNav
              account={account}
              isAuthenticated={isAuthenticated}
              logout={logout}
              navigationItems={navigationItems}
              navigate={navigate}
            />
            {/* Apple Logo - Visible on all screens */}
            <NavigationMenuItem className="hidden lg:flex  items-center">
              <Link
                to="/"
                className="flex items-center transition-transform duration-300 ease-in-out hover:scale-110"
              >
                <Apple className="h-5 w-5 text-black-200" />
              </Link>
            </NavigationMenuItem>
            {/* Desktop Navigation - Hidden on mobile */}
            <DesktopNav navigationItems={navigationItems} />
            {/* Search and Shopping Bag Icons - Visible on all screens */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-black/5 transition-transform duration-300 ease-in-out"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                {isSearchOpen ? (
                  <X className="h-4 w-4 text-black-200" />
                ) : (
                  <Search className="h-4 w-4 text-black-200" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-black/5 transition-transform duration-300 ease-in-out"
                onClick={() => {
                  setIsShoppingBagOpen(!isShoppingBagOpen);
                  if (isSearchOpen) setIsSearchOpen(false);
                }}
              >
                {isShoppingBagOpen ? (
                  <X className="h-4 w-4 text-black-200" />
                ) : (
                  <div className="relative">
                    <ShoppingBag className="h-4 w-4 text-black-200" />
                    {items.length > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-blue-600 text-[8px] text-white" />
                    )}
                  </div>
                )}
              </Button>
            </div>
          </NavigationMenu>
        </nav>

        {/* Search Dropdown - Responsive */}
        <SeachDropDown
          isSearchOpen={isSearchOpen}
          navigate={navigate}
          searchRef={searchRef}
        />

        {/* Shopping Bag Dropdown - Responsive */}
        <ShoppingBagDropDown
          account={account}
          isAuthenticated={isAuthenticated}
          isShoppingBagOpen={isShoppingBagOpen}
          items={items}
          subtotal={subtotal}
          logout={logout}
          navigate={navigate}
          shoppingBagRef={shoppingBagRef}
        />
      </div>
    </header>
  );
}
