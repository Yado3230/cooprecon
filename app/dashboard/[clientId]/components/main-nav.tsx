"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();
  const routes = [
    {
      href: `/dashboard/${params.clientId}`,
      label: "Reconciliation",
      active: pathname === `/dashboard/${params.clientId}`,
    },
    {
      href: `/dashboard/${params.clientId}/templateheader`,
      label: "Header Template",
      active: pathname === `/dashboard/${params.clientId}/templateheader`,
    },
    {
      href: `/dashboard/${params.clientId}/clientinfo`,
      label: "Client Info",
      active: pathname === `/dashboard/${params.clientId}/clientinfo`,
    },
    {
      href: `/dashboard/${params.clientId}/users`,
      label: "Users",
      active: pathname === `/dashboard/${params.clientId}/users`,
    },
    {
      href: `/dashboard/${params.clientId}/reports`,
      label: "Reports",
      active: pathname === `/dashboard/${params.clientId}/reports`,
    },
  ];
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text font-medium transition-colors hover:text-primary",
            route.active
              ? "text-cyan-500 dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
