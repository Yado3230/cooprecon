"use client";

import { Button } from "@/components/ui/button";
import { setClient } from "@/lib/features/client/clientSlice";
import { RootState } from "@/lib/store";
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
import { useDispatch, useSelector } from "react-redux";

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
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState("");
  const router = useRouter();
  const activeClient = useSelector(
    (state: RootState) => state.client.activeClient
  );
  const dispatch = useDispatch();

  const menuItems = [
    {
      href: `/dashboard/dashboard`,
      label: "Dashboard",
      active: pathname === `/dashboard/dashboard`,
      authorized: true,
      icon: (
        <DashboardIcon
          color={`${
            pathname === `/dashboard/dashboard` ? "#0EB8D5" : "#707E94"
          }`}
        />
      ),
    },
    {
      href: `/dashboard`,
      label: "Client",
      active: pathname === `/dashboard`,
      authorized: true,
      icon: (
        <User2
          size={15}
          color={`${pathname === `/dashboard` ? "#0EB8D5" : "#707E94"}`}
        />
      ),
    },
  ];
  const settings = [
    {
      href: `/dashboard/settings`,
      label: "Settings",
      active: pathname === `/dashboard/settingss`,
      authorized: true,
      items: [
        {
          href: `/dashboard/settings`,
          label: "Bank",
          active: pathname === `/dashboard/settings`,
          authorized: true,
          icon: (
            <Calculator
              size={15}
              color={`${
                pathname === `/dashboard/settings` ? "#fff" : "#707E94"
              }`}
            />
          ),
        },
        {
          href: `/dashboard/settings/categories`,
          label: "Category",
          active: pathname === `/dashboard/settings/categories`,
          authorized: true,
          icon: (
            <Calculator
              size={15}
              color={`${
                pathname === `/dashboard/settings/categories`
                  ? "#fff"
                  : "#707E94"
              }`}
            />
          ),
        },
        {
          href: `/dashboard/settings/products`,
          label: "Product Type",
          active: pathname === `/dashboard/settings/products`,
          authorized: true,
          icon: (
            <Calculator
              size={15}
              color={`${
                pathname === `/dashboard/settings/products` ? "#fff" : "#707E94"
              }`}
            />
          ),
        },
        {
          href: `/dashboard/settings/processingtypes`,
          label: "Processing Tx Type",
          active: pathname === `/dashboard/settings/processingtypes`,
          authorized: true,
          icon: (
            <Calculator
              size={15}
              color={`${
                pathname === `/dashboard/settings/processingtypes`
                  ? "#fff"
                  : "#707E94"
              }`}
            />
          ),
        },
        {
          href: `/dashboard/settings/settlements`,
          label: "Settlements",
          active: pathname === `/dashboard/settings/settlements`,
          authorized: true,
          icon: (
            <Calculator
              size={15}
              color={`${
                pathname === `/dashboard/settings/settlements`
                  ? "#fff"
                  : "#707E94"
              }`}
            />
          ),
        },
        {
          href: `/dashboard/settings/servicestations`,
          label: "Service Stations",
          active: pathname === `/dashboard/settings/servicestations`,
          authorized: true,
          icon: (
            <Calculator
              size={15}
              color={`${
                pathname === `/dashboard/settings/servicestations`
                  ? "#fff"
                  : "#707E94"
              }`}
            />
          ),
        },
        {
          href: `/dashboard/settings/reconsettings`,
          label: "Recon Settings",
          active: pathname === `/dashboard/settings/reconsettings`,
          authorized: true,
          icon: (
            <Calculator
              size={15}
              color={`${
                pathname === `/dashboard/settings/reconsettings`
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

  const clientItems = [
    {
      href: `/dashboard/client`,
      label: `${activeClient.clientName || activeClient.label}`,
      active: pathname === `/dashboard/client`,
      authorized: true,
      items: [
        {
          href: `/dashboard/${activeClient.id || activeClient.value}/dashboard`,
          label: "Dashboard",
          active:
            pathname ===
            `/dashboard/${activeClient.id || activeClient.value}/dashboard`,
          authorized: true,
          icon: (
            <Calculator
              size={15}
              color={`${
                pathname ===
                `/dashboard/${activeClient.id || activeClient.value}/dashboard`
                  ? "#fff"
                  : "#707E94"
              }`}
            />
          ),
        },
        {
          href: `/dashboard/${activeClient.id || activeClient.value}`,
          label: "Reconcilation",
          active:
            pathname === `/dashboard/${activeClient.id || activeClient.value}`,
          authorized: true,
          icon: (
            <Calculator
              size={15}
              color={`${
                pathname ===
                `/dashboard/${activeClient.id || activeClient.value}`
                  ? "#fff"
                  : "#707E94"
              }`}
            />
          ),
        },
        {
          href: `/dashboard/${
            activeClient.id || activeClient.value
          }/templateheader`,
          label: "File Template",
          active:
            pathname ===
            `/dashboard/${
              activeClient.id || activeClient.value
            }/templateheader`,
          authorized: true,
          icon: (
            <Calculator
              size={15}
              color={`${
                pathname ===
                `/dashboard/${
                  activeClient.id || activeClient.value
                }/templateheader`
                  ? "#fff"
                  : "#707E94"
              }`}
            />
          ),
        },
        {
          href: `/dashboard/${
            activeClient.id || activeClient.value
          }/electronicjournal`,
          label: "EJ File",
          active:
            pathname ===
            `/dashboard/${
              activeClient.id || activeClient.value
            }/electronicjournal`,
          authorized: true,
          icon: (
            <Calculator
              size={15}
              color={`${
                pathname ===
                `/dashboard/${
                  activeClient.id || activeClient.value
                }/electronicjournal`
                  ? "#fff"
                  : "#707E94"
              }`}
            />
          ),
        },
        {
          href: `/dashboard/${
            activeClient.id || activeClient.value
          }/clientinfo`,
          label: "Client Info",
          active:
            pathname ===
            `/dashboard/${activeClient.id || activeClient.value}/clientinfo`,
          authorized: true,
          icon: (
            <Calculator
              size={15}
              color={`${
                pathname ===
                `/dashboard/${activeClient.id || activeClient.value}/clientinfo`
                  ? "#fff"
                  : "#707E94"
              }`}
            />
          ),
        },
        {
          href: `/dashboard/${activeClient.id || activeClient.value}/users`,
          label: "Users",
          active:
            pathname ===
            `/dashboard/${activeClient.id || activeClient.value}/users`,
          authorized: true,
          icon: (
            <Calculator
              size={15}
              color={`${
                pathname ===
                `/dashboard/${activeClient.id || activeClient.value}/users`
                  ? "#fff"
                  : "#707E94"
              }`}
            />
          ),
        },
        {
          href: `/dashboard/${
            activeClient.id || activeClient.value
          }/servicestations`,
          label: "Service Station",
          active:
            pathname ===
            `/dashboard/${
              activeClient.id || activeClient.value
            }/servicestations`,
          authorized: true,
          icon: (
            <Calculator
              size={15}
              color={`${
                pathname ===
                `/dashboard/${
                  activeClient.id || activeClient.value
                }/servicestations`
                  ? "#fff"
                  : "#707E94"
              }`}
            />
          ),
        },
        {
          href: `/dashboard/${activeClient.id || activeClient.value}/clientapi`,
          label: "Client API",
          active:
            pathname ===
            `/dashboard/${activeClient.id || activeClient.value}/clientapi`,
          authorized: true,
          icon: (
            <Link2Icon
              size={15}
              color={`${
                pathname ===
                `/dashboard/${activeClient.id || activeClient.value}/clientapi`
                  ? "#0EB8D5"
                  : "#707E94"
              }`}
            />
          ),
        },
        {
          href: `/dashboard/${
            activeClient.id || activeClient.value
          }/operations`,
          label: "Operations",
          active:
            pathname ===
            `/dashboard/${activeClient.id || activeClient.value}/operations`,
          authorized: true,
          icon: (
            <FileJson
              size={15}
              color={`${
                pathname ===
                `/dashboard/${activeClient.id || activeClient.value}/operations`
                  ? "#0EB8D5"
                  : "#707E94"
              }`}
            />
          ),
        },
        {
          href: `/dashboard/${activeClient.id || activeClient.value}/reports`,
          label: "Reports",
          active:
            pathname ===
            `/dashboard/${activeClient.id || activeClient.value}/reports`,
          authorized: true,
          icon: (
            <BookTemplate
              size={15}
              color={`${
                pathname ===
                `/dashboard/${activeClient.id || activeClient.value}/reports`
                  ? "#0EB8D5"
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
    <div>
      <nav
        className={cn("flex flex-col justify-center space-y-2 mt-3", className)}
      >
        <div className="font-semibold opacity-50">Menu</div>
        {menuItems.map((route, ind) => (
          <div
            key={ind}
            className={`${!route.authorized && "cursor-not-allowed"}`}
            title={`${!route.authorized && "Not Authorized"}`}
          >
            <Button
              variant="outline"
              className={cn(
                " w-full flex px-2 items-center justify-start border-none hover:text-cyan-500 rounded py-1 space-x-2",
                route.active ? "text-cyan-500 " : "text-muted-foreground"
              )}
              key={route.href}
              onClick={() => {
                dispatch(setClient(""));
                router.push(`${route.href}`);
              }}
            >
              <span className="w-full flex items-center justify-between">
                <span className="flex items-center w-full space-x-2">
                  <span className="">{route?.icon}</span>
                  <Link
                    href={route.href}
                    className={cn(
                      "text-base font-medium disabled transition-colors"
                    )}
                  >
                    <span>{route.label}</span>
                  </Link>
                </span>
              </span>
            </Button>
          </div>
        ))}
        {activeClient.length !== 0 &&
          activeClient !== undefined &&
          clientItems.map((route, index) => (
            <div key={index}>
              <div
                className={`${!route.authorized && "cursor-not-allowed"}`}
                title={`${!route.authorized && "Not Authorized"}`}
              >
                <Button
                  variant="outline"
                  className={cn(
                    " w-full flex px-2 items-center justify-start border-none hover:text-cyan-500 rounded py-1 space-x-2",
                    route.active ? "text-cyan-500" : "text-muted-foreground"
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
        {settings.map((route, index) => (
          <div key={index}>
            <div
              className={`${!route.authorized && "cursor-not-allowed"}`}
              title={`${!route.authorized && "Not Authorized"}`}
            >
              <Button
                variant="outline"
                className={cn(
                  " w-full flex px-2 items-center justify-start border-none hover:text-cyan-500 rounded py-1 space-x-2",
                  route.active
                    ? "text-white bg-cyan-500 hover:text-white hover:bg-cyan-500"
                    : "text-muted-foreground"
                )}
                key={route.href}
                onClick={() => {
                  dispatch(setClient(""));
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
                    className={cn(
                      " w-full flex px-1 my-2 items-center justify-start border-none hover:text-cyan-500 rounded py-1 space-x-2",
                      route.active ? "text-cyan-500" : "text-muted-foreground"
                    )}
                    key={route.href}
                    onClick={() => {
                      dispatch(setClient(""));
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
    </div>
  );
};
