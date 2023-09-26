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
      href: `/dashboard`,
      label: "Overview",
      active: pathname === `/dashboard`,
      icon: (
        <LayoutDashboard
          size={15}
          color={`${pathname === `/dashboard` ? "#0EB8D5" : "#707E94"}`}
        />
      ),
    },
    {
      href: `/dashboard/challenges`,
      label: "Challenges",
      active: pathname === `/dashboard/challenges`,
      icon: (
        <Gamepad2
          size={15}
          color={`${
            pathname === `/dashboard/challenges` ? "#0EB8D5" : "#707E94"
          }`}
        />
      ),
    },
    {
      href: `/dashboard/transactionrule`,
      label: "Transaction Rules",
      active: pathname === `/dashboard/transactionrule`,
      icon: (
        <DollarSignIcon
          size={15}
          color={`${
            pathname === `/dashboard/transactionrule` ? "#0EB8D5" : "#707E94"
          }`}
        />
      ),
    },
    {
      href: `/dashboard/customers`,
      label: "Customers",
      active: pathname === `/dashboard/customers`,
      icon: (
        <User
          size={15}
          color={`${
            pathname === `/dashboard/customers` ? "#0EB8D5" : "#707E94"
          }`}
        />
      ),
    },
    {
      href: `/dashboard/packages`,
      label: "Packages",
      active: pathname === `/dashboard/packages`,
      icon: (
        <Package
          size={15}
          color={`${
            pathname === `/dashboard/packages` ? "#0EB8D5" : "#707E94"
          }`}
        />
      ),
    },
    {
      href: `/dashboard/levels`,
      label: "Levels",
      active: pathname === `/dashboard/levels`,
      icon: (
        <LucideShovel
          size={15}
          color={`${pathname === `/dashboard/levels` ? "#0EB8D5" : "#707E94"}`}
        />
      ),
    },
    {
      href: `/dashboard/transactions`,
      label: "Transactions",
      active: pathname === `/dashboard/transactions`,
      icon: (
        <DollarSign
          size={15}
          color={`${
            pathname === `/dashboard/transactions` ? "#0EB8D5" : "#707E94"
          }`}
        />
      ),
    },
    {
      href: `/dashboard/settings`,
      label: "Settings",
      active: pathname === `/dashboard/settings`,
      icon: (
        <Settings
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
