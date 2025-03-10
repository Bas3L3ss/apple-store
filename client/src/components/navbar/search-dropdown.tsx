import { ChevronRight, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Link } from "react-router";
import { cn } from "@/src/lib/utils";
import { useState } from "react";

type Props = { isSearchOpen: boolean; navigate: (nav: string) => void };

const SeachDropDown = ({ isSearchOpen, navigate }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div
      className={cn(
        " flex-1  absolute top-full left-0 right-0 z-50  backdrop-blur-xl transition-all duration-300 ease-in-out overflow-y-auto overflow-x-hidden   shadow-lg",
        isSearchOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
      )}
    >
      <div className="mx-auto max-w-[800px] px-6 py-8 md:py-12">
        <div className="relative">
          <Search className="absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/shop?search=${searchQuery}`);
            }}
          >
            <Input
              placeholder="Search apple.com"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-none bg-transparent pl-8 text-lg md:text-[22px] font-normal placeholder:text-gray-400 focus-visible:ring-0"
              autoFocus={isSearchOpen}
            />
          </form>
        </div>
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-500">Quick Links</h3>
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
  );
};

export default SeachDropDown;
