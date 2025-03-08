"use client";

import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/src/components/ui/navigation-menu";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import {
  Apple,
  Search,
  ShoppingBag,
  X,
  Package,
  Settings,
  LogOut,
  Menu,
  ChevronRight,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet";

import { cn, formatPrice } from "@/src/lib/utils";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useCartStore } from "../store/useCartStore";

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
  const { isLoggedIn: isAuthenticated, logout, account } = useAuth();
  const { items } = useCartStore();
  const subtotal = items.reduce((total, item) => total + item.totalPrice, 0);

  const navigate = useNavigate();

  // Close other dropdown when one is opened
  useEffect(() => {
    if (isSearchOpen) setIsShoppingBagOpen(false);
  }, [isSearchOpen]);

  useEffect(() => {
    if (isShoppingBagOpen) setIsSearchOpen(false);
  }, [isShoppingBagOpen]);

  // Handle ESC key to close dropdowns
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
        setIsShoppingBagOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

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
            {/* Mobile Menu */}
            <div className="lg:hidden  flex items-center">
              <NavigationMenuItem className="flex lg:hidden  items-center">
                <Link
                  to="/"
                  className="flex items-center transition-transform duration-300 ease-in-out hover:scale-110"
                >
                  <Apple className="h-5 w-5 text-black-200" />
                </Link>
              </NavigationMenuItem>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-black/5"
                  >
                    <Menu className="h-5 w-5 text-black-200" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-[300px] sm:w-[350px] border-none p-0"
                >
                  <div className="h-full flex flex-col">
                    {/* Fixed header inside mobile menu */}
                    <div className="py-6 px-6 flex items-center justify-center border-b">
                      <Apple className="h-7 w-7 text-black-200" />
                    </div>

                    {/* Scrollable content area */}
                    <div className="flex-1 overflow-y-auto px-6 py-6">
                      <div className="space-y-6 mb-8">
                        {navigationItems.map((item) => (
                          <Link
                            key={item.name}
                            to={`/shop?category=${item.href}`}
                            className="flex items-center justify-between py-2 text-base font-medium text-black-200 transition-colors hover:text-black/70"
                          >
                            {item.name}
                            <ChevronRight className="h-4 w-4 opacity-50" />
                          </Link>
                        ))}
                        <Link
                          to="/support"
                          className="flex items-center justify-between py-2 text-base font-medium text-black-200 transition-colors hover:text-black/70"
                        >
                          Support
                          <ChevronRight className="h-4 w-4 opacity-50" />
                        </Link>
                      </div>

                      <div className="relative mb-8">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                          placeholder="Search apple.com"
                          className="pl-10 text-sm rounded-full bg-gray-100 border-none focus-visible:ring-1 focus-visible:ring-black/20"
                        />
                      </div>

                      {isAuthenticated && account ? (
                        <div className="space-y-8">
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-12 w-12 ring-2 ring-gray-100">
                              <AvatarImage
                                src={
                                  account?.avatar || "/api/placeholder/64/64"
                                }
                                alt={account?.username}
                              />
                              <AvatarFallback className="bg-blue-50 text-blue-600 font-medium">
                                {account?.username?.charAt(0) || "U"}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-semibold">
                                {account.username}
                              </p>
                              <p className="text-xs text-gray-500">
                                {account.email}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <Link
                              to="/order"
                              className="flex items-center space-x-3 text-sm font-medium transition-colors duration-200 hover:text-blue-600 py-2"
                            >
                              <Package className="h-5 w-5" />
                              <span>Your Orders</span>
                            </Link>
                            <Link
                              to="/cart"
                              className="flex items-center space-x-3 text-sm font-medium transition-colors duration-200 hover:text-blue-600 py-2"
                            >
                              <ShoppingBag className="h-5 w-5" />
                              <span>Your Cart</span>
                            </Link>
                            <Link
                              to="/profile"
                              className="flex items-center space-x-3 text-sm font-medium transition-colors duration-200 hover:text-blue-600 py-2"
                            >
                              <Settings className="h-5 w-5" />
                              <span>Account Settings</span>
                            </Link>
                            <Link
                              to="#"
                              className="flex items-center space-x-3 text-sm font-medium transition-colors duration-200 hover:text-blue-600 py-2"
                              onClick={() => logout()}
                            >
                              <LogOut className="h-5 w-5" />
                              <span>Sign Out</span>
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-6 mt-10">
                          <Button
                            className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-full py-5 font-medium transition-colors duration-200"
                            onClick={() => navigate("/auth")}
                          >
                            Sign In
                          </Button>
                          <div className="text-center">
                            <span className="text-xs text-gray-500">
                              Need an Apple ID?{" "}
                              <Link
                                to="/auth"
                                className="text-blue-600 hover:underline font-medium"
                              >
                                Create one now
                              </Link>
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Optional fixed footer area if needed */}
                    <div className="py-4 px-6 border-t bg-gray-50">
                      <div className="text-xs text-center text-gray-500">
                        © {new Date().getFullYear()} Apple Inc. All rights
                        reserved.
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

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
            <NavigationMenuList className="hidden lg:flex flex-1 justify-center space-x-8">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <Link
                    to={`/shop?category=${item.href}`}
                    className="text-[12px] font-medium text-black-200 transition-all duration-300 hover:text-black hover:opacity-80 relative after:absolute after:bottom-[-3px] after:left-0 after:right-0 after:h-[1px] after:bg-current after:origin-center after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                  >
                    {item.name}
                  </Link>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <Link
                  to={`/support`}
                  className="text-[12px] font-medium text-black-200 transition-all duration-300 hover:text-black hover:opacity-80 relative after:absolute after:bottom-[-3px] after:left-0 after:right-0 after:h-[1px] after:bg-current after:origin-center after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                >
                  Support
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>

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
        <div
          className={cn(
            " flex-1  absolute top-full left-0 right-0 z-50  backdrop-blur-xl transition-all duration-300 ease-in-out overflow-y-auto overflow-x-hidden   shadow-lg",
            isSearchOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="mx-auto max-w-[800px] px-6 py-8 md:py-12">
            <div className="relative">
              <Search className="absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search apple.com"
                className="border-none bg-transparent pl-8 text-lg md:text-[22px] font-normal placeholder:text-gray-400 focus-visible:ring-0"
                autoFocus={isSearchOpen}
              />
            </div>
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-500">
                Quick Links
              </h3>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "Visiting an Apple Store",
                  "AirPods",
                  "Apple Vision Pro",
                  "iPhone",
                  "iPad",
                  "Mac",
                  "Apple Watch",
                  "Apple TV",
                  "Accessories",
                ].map((link) => (
                  <Link
                    key={link}
                    to={`/more/${link}`}
                    className="text-sm transition-colors duration-200 hover:text-blue-600 flex items-center space-x-1 group"
                  >
                    <span>{link}</span>
                    <ChevronRight className="h-3 w-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Shopping Bag Dropdown - Responsive */}
        <div
          className={cn(
            "absolute top-full left-0 right-0 z-50   backdrop-blur-xl transition-all duration-300 ease-in-out overflow-hidden shadow-lg",
            isShoppingBagOpen
              ? "max-h-[400px] opacity-100"
              : "max-h-0 opacity-0"
          )}
        >
          <div className="mx-auto max-w-[800px] px-6 py-8 md:py-12">
            {isAuthenticated && account ? (
              <>
                <div className="flex items-center space-x-5 mb-8">
                  <Avatar className="h-12 w-12 ring-2 ring-gray-100">
                    <AvatarImage
                      src={account?.avatar || "/api/placeholder/64/64"}
                      alt={account?.username}
                    />
                    <AvatarFallback className="bg-blue-50 text-blue-600 font-medium">
                      {account?.username?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-base md:text-lg font-semibold">
                      {account.username}
                    </p>
                    <p className="text-xs md:text-sm text-gray-500">
                      {account.email}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Link
                    to="/order"
                    className="flex items-center space-x-3 group transition-colors duration-200 hover:text-blue-600"
                  >
                    <Package className="h-5 w-5" />
                    <span className="font-medium">Your Orders</span>
                    <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link
                    to="/cart"
                    className="flex items-center space-x-3 group transition-colors duration-200 hover:text-blue-600"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    <span className="font-medium">Your Cart</span>
                    <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-3 group transition-colors duration-200 hover:text-blue-600"
                  >
                    <Settings className="h-5 w-5" />
                    <span className="font-medium">Account Settings</span>
                    <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link
                    to="#"
                    className="flex items-center space-x-3 group transition-colors duration-200 hover:text-blue-600"
                    onClick={() => logout()}
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">Sign Out</span>
                    <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-semibold mb-3">
                      {items.length === 0
                        ? "Your bag is empty"
                        : "Your shopping bag"}
                    </h2>
                    {items.length > 0 && (
                      <div className="space-y-1">
                        <p className="text-base text-gray-700">
                          {items.length} item{items.length !== 1 && "s"} in your
                          bag
                        </p>
                        <p className="text-lg font-medium">
                          Total: {formatPrice(subtotal)}
                        </p>
                        <Link
                          to="/cart"
                          className="text-sm text-blue-600 hover:underline inline-flex items-center space-x-1"
                        >
                          <span>View bag</span>
                          <ChevronRight className="h-3 w-3" />
                        </Link>
                      </div>
                    )}
                  </div>

                  {items.length > 0 && (
                    <div className="hidden md:block">
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6"
                        onClick={() => navigate("/checkout")}
                      >
                        Checkout
                      </Button>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-6">
                    Sign in to see your saved items and personalized
                    recommendations.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full py-5 font-medium"
                      onClick={() => navigate("/auth")}
                    >
                      Sign In
                    </Button>
                    <Button
                      className="flex-1 bg-gray-100 text-black hover:bg-gray-200 rounded-full py-5 font-medium"
                      onClick={() => navigate("/auth?mode=register")}
                    >
                      Create Account
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
