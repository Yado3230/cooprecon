"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DashboardIcon } from "@radix-ui/react-icons";
import {
  BookTemplate,
  Calculator,
  ChevronDown,
  ChevronUp,
  FileJson,
  Link2Icon,
  User,
  User2,
} from "lucide-react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { FC, useState } from "react";

type SidebarProps = {
  className: any;
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MainNav: FC<SidebarProps> = ({
  className,
  isOpened,
  setIsOpened,
}) => {
  const [isOpen, setIsOpen] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const role = typeof window !== "undefined" && localStorage.getItem("role");

  const routes = [
    {
      href: `/users/dashboard`,
      label: "Dashboard",
      active: pathname === `/users/dashboard`,
      authorized:
        role === "CLIENT-ADMIN" ||
        role === "FILE-MANAGER" ||
        role === "RECON-PROCESSOR" ||
        role === "REPORT-VIEWER",
      icon: (
        <DashboardIcon
          color={`${pathname === `/users/dashboard` ? "#0EB8D5" : "#707E94"}`}
        />
      ),
    },
    {
      href: `/users`,
      label: "Reconciliation",
      active: pathname === `/users`,
      authorized:
        role === "CLIENT-ADMIN" ||
        role === "FILE-MANAGER" ||
        role === "RECON-PROCESSOR" ||
        role === "REPORT-VIEWER",
      icon: (
        <User2
          size={15}
          color={`${pathname === `/users` ? "#0EB8D5" : "#707E94"}`}
        />
      ),
    },
    {
      href: `/users/templateheader`,
      label: "File Template",
      active: pathname === `/users/templateheader`,
      authorized: role === "CLIENT-ADMIN" || role === "FILE-MANAGER",
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
      href: `/users/users`,
      label: "Users",
      active: pathname === `/users/users`,
      authorized: role === "CLIENT-ADMIN",
      icon: (
        <User
          size={15}
          color={`${pathname === `/users/users` ? "#0EB8D5" : "#707E94"}`}
        />
      ),
    },
    {
      href: `/users/reports`,
      label: "Reports",
      active: pathname === `/users/reports`,
      authorized: role === "CLIENT-ADMIN" || role === "REPORT-VIEWER",
      icon: (
        <BookTemplate
          size={15}
          color={`${pathname === `/users/reports` ? "#0EB8D5" : "#707E94"}`}
        />
      ),
    },
  ];

  const settings = [
    {
      href: `/users/settings`,
      label: "Settings",
      active: pathname === `/dashboard/settingss`,
      authorized: true,
      items: [
        {
          href: `/users/settings`,
          label: "Profile",
          active: pathname === `/users/settings`,
          authorized: true,
          icon: (
            <Calculator
              size={15}
              color={`${pathname === `/users/settings` ? "#fff" : "#707E94"}`}
            />
          ),
        },
        {
          href: `/users/settings/settlements`,
          label: "Settlements",
          active: pathname === `/users/settings/settlements`,
          authorized: role === "CLIENT-ADMIN",
          icon: (
            <Calculator
              size={15}
              color={`${
                pathname === `/users/settings/settlements` ? "#fff" : "#707E94"
              }`}
            />
          ),
        },
        {
          href: `/users/settings/servicestations`,
          label: "Service Stations",
          active: pathname === `/users/settings/servicestations`,
          authorized: role === "CLIENT-ADMIN",
          icon: (
            <Calculator
              size={15}
              color={`${
                pathname === `/users/settings/servicestations`
                  ? "#fff"
                  : "#707E94"
              }`}
            />
          ),
        },
      ],
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
        <Button
          variant="outline"
          disabled={!route.authorized}
          className={cn(
            " w-full flex px-1 text-base items-center justify-start border-none hover:text-cyan-500 rounded py-1 space-x-2",
            route.active ? "text-cyan-500" : "text-muted-foreground"
          )}
          key={route.href}
          onClick={() => router.push(route.href)}
        >
          <span>{route?.icon}</span>
          <Link className="" href={route.href}>
            {route.label}
          </Link>
        </Button>
      ))}

      {settings.map((route, index) => (
        <div key={index}>
          <div
            className={`${!route.authorized && "cursor-not-allowed"}`}
            title={`${!route.authorized && "Not Authorized"}`}
          >
            <Button
              variant="outline"
              className={cn(
                " w-full flex px-1 items-center justify-start border-none hover:text-cyan-500 rounded py-1 space-x-2",
                route.active
                  ? "text-white bg-cyan-500 hover:text-white hover:bg-cyan-500"
                  : "text-muted-foreground"
              )}
              key={route.href}
              onClick={() => {
                setIsOpened(!isOpened);
                if (route.items) setIsOpen(route.label);
                if (isOpen === route.label) setIsOpen("");
                if (!route.items) router.push(route.href);
              }}
            >
              <span className="w-full flex items-center justify-between">
                <span className="flex items-center w-full space-x-2">
                  <span>{route?.icon}</span>
                  <Link
                    href={!route.items ? route.href : ""}
                    className={cn(
                      "text-base font-medium disabled transition-colors"
                    )}
                  >
                    <span>{route.label}</span>
                  </Link>
                </span>
                <span>
                  {route.items &&
                    (isOpen === route.label ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    ))}
                </span>
              </span>
            </Button>
          </div>
          {isOpen === route.label &&
            route.items &&
            route.items.map((route, index) => (
              <div
                key={index}
                className={`${
                  !route.authorized && "cursor-not-allowed animate-in"
                } border-l ml-3 pl-2`}
                title={`${!route.authorized && "Not Authorized"}`}
              >
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!route.authorized}
                  className={cn(
                    " w-full flex px-1 my-2 items-center justify-start border-none hover:text-cyan-500 rounded py-1 space-x-2",
                    route.active ? "text-cyan-500" : "text-muted-foreground"
                  )}
                  key={route.href}
                  onClick={() => {
                    setIsOpened(!isOpened);
                    router.push(route.href);
                  }}
                >
                  <span className="bg-cyan-400">{route?.icon}</span>

                  <Link
                    href={route.href}
                    className={cn(
                      "text-sm font-medium disabled transition-colors"
                    )}
                  >
                    {route.label}
                  </Link>
                </Button>
              </div>
            ))}
        </div>
      ))}
    </nav>
  );
};
