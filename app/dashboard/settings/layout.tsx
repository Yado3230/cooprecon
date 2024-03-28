import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/app/users/settings/components/sidebar-nav";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = [
  {
    title: "Bank",
    href: "/dashboard/settings",
  },
  {
    title: "Category",
    href: "/dashboard/settings/categories",
  },
  {
    title: "Product Type",
    href: "/dashboard/settings/products",
  },
  {
    title: "Processing Tx Type",
    href: "/dashboard/settings/processingtypes",
  },
  {
    title: "Settlements",
    href: "/dashboard/settings/settlements",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="space-y-6 p-5 pb-16 block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">Manage your account settings.</p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-4 w-full">
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </>
  );
}
