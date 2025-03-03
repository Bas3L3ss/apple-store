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
} from "lucide-react";

import { cn } from "@/src/lib/utils";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const navigationItems = [
  { name: "Store", href: "" },
  { name: "Mac", href: "macbook" },
  { name: "iPad", href: "ipad" },
  { name: "iPhone", href: "iphone" },
  { name: "AirPods", href: "airpods" },
  { name: "AppleWatch", href: "apple_watch" },
  { name: "Accessories", href: "phonecase" },
];

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShoppingBagOpen, setIsShoppingBagOpen] = useState(false);
  const { isLoggedIn: isAuthenticated, logout, account } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    if (isSearchOpen) {
      setIsShoppingBagOpen(false);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (isShoppingBagOpen) {
      setIsSearchOpen(false);
    }
  }, [isShoppingBagOpen]);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
        setIsShoppingBagOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <header className="fixed  top-0 left-0 right-0 z-50">
      <div className="relative">
        <nav className="bg-white/80 backdrop-blur-xl">
          <NavigationMenu className="mx-auto max-w-[1024px] flex items-center justify-center px-4 py-3">
            <NavigationMenuList className="flex-1 justify-center gap-8">
              <NavigationMenuItem className="flex items-center">
                <a href="/" className="flex items-center">
                  <Apple className="h-5 w-5 text-black-200" />
                </a>
              </NavigationMenuItem>

              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <a
                    href={`/shop?category=${item.href}`}
                    className="text-[12px] font-normal text-black-200 transition-colors hover:text-black/80"
                  >
                    {item.name}
                  </a>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <a
                  href={`/support`}
                  className="text-[12px] font-normal text-black-200 transition-colors hover:text-black/80"
                >
                  Support
                </a>
              </NavigationMenuItem>

              <NavigationMenuItem className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 hover:bg-transparent transition-transform duration-300 ease-in-out hover:scale-110"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  {isSearchOpen ? (
                    <X className="h-4 w-4 text-black-200" />
                  ) : (
                    <Search className="h-4 w-4 text-black-200" />
                  )}
                </Button>
              </NavigationMenuItem>

              <NavigationMenuItem className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 hover:bg-transparent transition-transform duration-300 ease-in-out hover:scale-110"
                  onClick={() => {
                    setIsShoppingBagOpen(!isShoppingBagOpen);
                    if (isSearchOpen) setIsSearchOpen(false);
                  }}
                >
                  {isShoppingBagOpen ? (
                    <X className="h-4 w-4 text-black-200" />
                  ) : (
                    <ShoppingBag className="h-4 w-4 text-black-200" />
                  )}
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div
          className={cn(
            "absolute top-full left-0 right-0 z-50   backdrop-blur-xl transition-all duration-300 ease-in-out overflow-hidden",
            isSearchOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="mx-auto max-w-[680px] px-4 py-12">
            <div className="relative">
              <Search className="absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search apple.com"
                className="border-none bg-transparent pl-8 text-[22px] font-normal   placeholder:text-gray-400 focus-visible:ring-0"
                autoFocus={isSearchOpen}
              />
            </div>
            <div className="mt-8">
              <h3 className="text-sm font-semibold  ">Quick Links</h3>
              <div className="mt-2 grid grid-cols-2 gap-4">
                {[
                  "Visiting an Apple Store",
                  "AirPods",
                  "Apple Vision Pro",
                  "iPhone",
                  "iPad",
                  "Mac",
                ].map((link) => (
                  <a
                    key={link}
                    href={`/more/${link}`}
                    className="text-sm    transition-colors duration-200"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          className={cn(
            "absolute top-full left-0 right-0  z-50  backdrop-blur-xl transition-all duration-300 ease-in-out overflow-hidden",
            isShoppingBagOpen
              ? "max-h-[300px] opacity-100"
              : "max-h-0 opacity-0"
          )}
        >
          <div className="mx-auto max-w-[680px] px-4 py-12">
            {isAuthenticated && account ? (
              <>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="h-12 w-12 rounded-full   flex items-center justify-center">
                    <Avatar className="size-12     ">
                      <AvatarImage
                        src={account?.avatar || "/api/placeholder/64/64"}
                        alt={account?.username}
                      />
                      <AvatarFallback>
                        {account?.username?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <p className="text-lg font-medium  ">{account.username}</p>
                    <p className="text-sm text-gray-400">{account.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <a
                    href="/order"
                    className="flex items-center space-x-2      transition-colors duration-200"
                  >
                    <Package className="h-5 w-5" />
                    <span>Your Orders</span>
                  </a>
                  <a
                    href="/cart"
                    className="flex items-center space-x-2      transition-colors duration-200"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    <span>Your Cart</span>
                  </a>
                  <a
                    href="/profile"
                    className="flex items-center space-x-2      transition-colors duration-200"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Account Settings</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center space-x-2      transition-colors duration-200"
                    onClick={() => logout()}
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </a>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-medium   mb-4">
                  Your bag is empty
                </h2>
                <p className="text-gray-400 mb-6">
                  Sign in to see your saved items or continue shopping.
                </p>
                <div className="flex flex-col space-y-4">
                  <Button
                    className="w-full bg-white text-black hover:bg-gray-200 transition-colors duration-200"
                    onClick={() => navigate("/auth")}
                  >
                    Sign In
                  </Button>
                  <div className="text-center">
                    <span className="text-sm text-gray-400">
                      Need an Apple ID?{" "}
                      <a href="/auth" className="text-blue-400 hover:underline">
                        Create one now
                      </a>
                    </span>
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
