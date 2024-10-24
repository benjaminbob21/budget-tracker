"use client";
import React, { useState } from "react";
import Logo, { LogoMobile } from "./Logo";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { UserButton } from "@clerk/nextjs";
import { ThemeSwitcherBtn } from "./ThemeSwitcherBtn";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";

const items = [
  { label: "Dashboard", link: "/" },
  { label: "Transactions", link: "/transactions" },
  { label: "Manage", link: "/manage" },
];

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="sticky top-0 w-full border-b bg-background">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left section - Logo + Menu Button */}
        <div className="flex items-center">
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-4">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px]">
                <div className="mt-6 flex flex-col gap-4">
                  <Logo className="hidden md:block" />
                  <LogoMobile className="block md:hidden" />
                  {items.map((item) => (
                    <Link
                      key={item.label}
                      href={item.link}
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "justify-start text-lg",
                        pathname === item.link
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Responsive Logo */}
          <div className="flex items-center">
            <Logo className="hidden md:block" />
            <LogoMobile className="block md:hidden" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:ml-8 md:flex md:gap-4">
            {items.map((item) => (
              <NavItem
                key={item.label}
                href={item.link}
                isActive={pathname === item.link}
              >
                {item.label}
              </NavItem>
            ))}
          </div>
        </div>

        {/* Right section - Theme + User */}
        <div className="flex items-center gap-4">
          <ThemeSwitcherBtn />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </nav>
    </div>
  );
};

const NavItem = ({ href, children, isActive }: NavItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "relative px-3 py-2 text-sm transition-colors hover:text-foreground",
        isActive ? "text-foreground" : "text-muted-foreground"
      )}
    >
      {children}
      {isActive && (
        <span className="absolute inset-x-1 -bottom-px h-px bg-foreground" />
      )}
    </Link>
  );
};

export default Navbar;
