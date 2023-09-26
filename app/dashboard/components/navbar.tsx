import { Search } from "./search";
import { UserNav } from "./user-nav";
import { AlertCircle, Menu } from "lucide-react";
import { ModeToggle } from "@/components/theme-toggle";
import Image from "next/image";

const Navbar = () => {
  // const challenges = await getChallenges();

  return (
    <div className="fixed z-10 shadow-sm bg-background opacity-90 px- top-0 right-0 left-0">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center justify-start space-x-2">
            <div>
              <Image
                src=""
                width={40}
                className="border"
                height={40}
                alt="img"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-cyan-500 text-lg">
                Coop Loyalty
              </span>
              <span className="text-xs text-orange-400">
                Cooperative bank of oromia
              </span>
            </div>
          </div>
          {/* <MainNav className="mx-6" /> */}
          <Menu className="absolute left-64 cursor-pointer" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <AlertCircle />
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
