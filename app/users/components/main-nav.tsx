"use client";

import { cn } from "@/lib/utils";
import { BookTemplate, FileJson, Link2Icon, User, User2 } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({ className }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const routes = [
    {
      href: `/users`,
      label: "Reconciliation",
      active: pathname === `/users`,
      icon: (
        <User2
          size={15}
          color={`${pathname === `/users` ? "#0EB8D5" : "#707E94"}`}
        />
      ),
    },
    {
      href: `/users/templateheader`,
      label: "Header Template",
      active: pathname === `/users/templateheader`,
      icon: (
        <Link2Icon
          size={15}
          color={`${
            pathname === `/users/templateheader` ? "#0EB8D5" : "#707E94"
          }`}
        />
      ),
    },
    {
      href: `/users/profile`,
      label: "Profile",
      active: pathname === `/users/profile`,
      icon: (
        <FileJson
          size={15}
          color={`${pathname === `/users/profile` ? "#0EB8D5" : "#707E94"}`}
        />
      ),
    },
    {
      href: `/users/reports`,
      label: "Reports",
      active: pathname === `/users/reports`,
      icon: (
        <BookTemplate
          size={15}
          color={`${pathname === `/users/reports` ? "#0EB8D5" : "#707E94"}`}
        />
      ),
    },
    {
      href: `/users/users`,
      label: "Users",
      active: pathname === `/users/users`,
      icon: (
        <User
          size={15}
          color={`${pathname === `/users/users` ? "#0EB8D5" : "#707E94"}`}
        />
      ),
    },
    {
      href: `/users/settings`,
      label: "Settings",
      active: pathname === `/users/settings`,
      icon: (
        <User
          size={15}
          color={`${pathname === `/users/settings` ? "#0EB8D5" : "#707E94"}`}
        />
      ),
    },
  ];
  return (
    <nav
      className={cn("flex flex-col justify-center space-y-2 mt-3", className)}
    >
      <div className="font-semibold">Menu</div>
      {routes.map((route) => (
        <div className="flex p-1 items-center space-x-2" key={route.href}>
          <span className="">{route?.icon}</span>
          <Link
            href={route.href}
            className={cn(
              "text-base font-medium transition-colors hover:text-primary",
              route.active
                ? "text-cyan-500 dark:text-white"
                : "text-muted-foreground"
            )}
          >
            {route.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}
