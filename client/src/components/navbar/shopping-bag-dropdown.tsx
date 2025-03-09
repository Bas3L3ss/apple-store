import { cn, formatPrice } from "@/src/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router";
import {
  ChevronRight,
  LogOut,
  Package,
  Settings,
  ShoppingBag,
} from "lucide-react";
import { Button } from "../ui/button";
import { CartItem, User } from "@/src/@types";

type Props = {
  isShoppingBagOpen: boolean;
  isAuthenticated: boolean;
  account: User | null;
  logout: () => void;
  navigate: (s: string) => void;
  items: CartItem[];
  subtotal: number;
};

const ShoppingBagDropDown = ({
  account,
  isAuthenticated,
  isShoppingBagOpen,
  logout,
  navigate,
  items,
  subtotal,
}: Props) => {
  return (
    <div
      className={cn(
        "absolute top-full left-0 right-0 z-50   backdrop-blur-xl transition-all duration-300 ease-in-out overflow-hidden shadow-lg",
        isShoppingBagOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
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
                <p className="font-medium group inline-flex w-full  items-center">
                  <span className="  ">
                    Your Cart <span>{items.length && `(${items.length})`}</span>
                  </span>
                  <span className="text-sm ml-2 hidden group-hover:inline">
                    {formatPrice(subtotal)}
                  </span>
                </p>
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
                    ? "Your cart is empty"
                    : "Your shopping cart"}
                </h2>
                {items.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-base text-gray-700">
                      {items.length} item{items.length !== 1 && "s"} in your
                      cart
                    </p>
                    <p className="text-lg font-medium">
                      Total: {formatPrice(subtotal)}
                    </p>
                  </div>
                )}
              </div>
              <Link
                to="/cart"
                className="text-xl text-blue-600 hover:underline inline-flex items-center space-x-1"
              >
                <span>View cart</span>
                <ChevronRight className="h-3 w-3" />
              </Link>
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
  );
};

export default ShoppingBagDropDown;
