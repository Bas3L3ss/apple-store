import { NavigationMenuItem, NavigationMenuList } from "../ui/navigation-menu";
import { Link } from "react-router";

type Props = {
  navigationItems: {
    name: string;
    href: string;
  }[];
};

const DesktopNav = ({ navigationItems }: Props) => {
  return (
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
  );
};
export default DesktopNav;
