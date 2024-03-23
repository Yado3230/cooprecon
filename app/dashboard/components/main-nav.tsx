"use client";

import { cn } from "@/lib/utils";
import { BookTemplate, FileJson, Link2Icon, User, User2 } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({ className }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const routes = [
    {
      href: `/dashboard`,
      label: "Client",
      active: pathname === `/dashboard`,
      icon: (
        <User2
          size={15}
          color={`${pathname === `/dashboard` ? "#0EB8D5" : "#707E94"}`}
        />
      ),
    },
    {
      href: `/dashboard/clientapi`,
      label: "Client API",
      active: pathname === `/dashboard/clientapi`,
      icon: (
        <Link2Icon
          size={15}
          color={`${
            pathname === `/dashboard/clientapi` ? "#0EB8D5" : "#707E94"
          }`}
        />
      ),
    },
    {
      href: `/dashboard/operations`,
      label: "Operations",
      active: pathname === `/dashboard/operations`,
      icon: (
        <FileJson
          size={15}
          color={`${
            pathname === `/dashboard/operations` ? "#0EB8D5" : "#707E94"
          }`}
        />
      ),
    },
    {
      href: `/dashboard/template`,
      label: "Template",
      active: pathname === `/dashboard/template`,
      icon: (
        <BookTemplate
          size={15}
          color={`${pathname === `/dashboard` ? "#0EB8D5" : "#707E94"}`}
        />
      ),
    },
    {
      href: `/dashboard/settings`,
      label: "Settings",
      active: pathname === `/dashboard/settings`,
      icon: (
        <BookTemplate
          size={15}
          color={`${
            pathname === `/dashboard/settings` ? "#0EB8D5" : "#707E94"
          }`}
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
