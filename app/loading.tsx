"use client";

import { Loader } from "@/components/ui/loader";

const Loading = () => {
  return (
    <div className="flex h-screen w-full text-sm items-center justify-center">
      <Loader />
    </div>
  );
};

export default Loading;
