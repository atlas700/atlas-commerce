import { ShoppingCartIcon, UserRoundIcon, TagIcon, ListOrdered } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const LINKS = [
  {
    id: "1",
    label: "Products",
    href: "/products",
    Icon: <TagIcon />,
  },
  {
    id: "2",
    label: "Orders",
    href: "/orders",
    Icon: <ListOrdered />,

  },
];

export function Header() {
  return (
    <header className="h-16 border-b border-primary/20 sticky top-0 inset-x-0 bg-background/10 backdrop-blur-lg">
      <div className="px-2 md:px-6 flex items-center justify-between h-full max-w-7xl w-full mx-auto shadow-2xl">
        <Button asChild variant={"ghost"}>
          <Link
            href={"/"}
            className="flex items-center justify-center gap-x-1 text-xl font-bold"
          >
            <ShoppingCartIcon className="size-5" />
            <span>Atlas</span>
          </Link>
        </Button>
        <nav>
          {LINKS.map((link) => (
            <Button asChild variant="link" key={link.id}>
              <Link href={link.href}>
                {link.Icon}
                {link.label}
              </Link>
            </Button>
          ))}
        </nav>
        <ul>
          <li>
            <Button asChild variant="outline">
              <Link href={"/profile"}>
                <UserRoundIcon />
              </Link>
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
