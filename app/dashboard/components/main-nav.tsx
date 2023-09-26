"use client";

import { cn } from "@/lib/utils";
import {
  DollarSign,
  DollarSignIcon,
  Gamepad2,
  LayoutDashboard,
  LucideShovel,
  Package,
  Settings,
  User,
} from "lucide-react";
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
      href: `/dashboard/client`,
      label: "Client",
      active: pathname === `/dashboard/client`,
      icon: (
        <LayoutDashboard
          size={15}
          color={`${pathname === `/dashboard/client` ? "#0EB8D5" : "#707E94"}`}
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
