import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet";
import { NavigationMenuItem } from "../ui/navigation-menu";
import { Link } from "react-router";
import {
  Apple,
  ChevronRight,
  LogOut,
  Menu,
  Package,
  Search,
  Settings,
  ShoppingBag,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "@/src/@types";

const MobileNav = ({
  navigate,
  isAuthenticated,
  navigationItems,
  account,
  logout,
}: {
  logout: () => void;
  navigate: (nav: string) => void;
  isAuthenticated: boolean;
  navigationItems: {
    name: string;
    href: string;
  }[];
  account: User | null;
}) => {
  return (
    <div className="lg:hidden gap-4  flex items-center">
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
                        src={account?.avatar || "/api/placeholder/64/64"}
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
                      <p className="text-xs text-gray-500">{account.email}</p>
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
                © {new Date().getFullYear()} Apple Inc. All rights reserved.
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <NavigationMenuItem className="flex lg:hidden  items-center">
        <Link
          to="/"
          className="flex items-center transition-transform duration-300 ease-in-out hover:scale-110"
        >
          <Apple className="h-5 w-5 text-black-200" />
        </Link>
      </NavigationMenuItem>
    </div>
  );
};

export default MobileNav;
