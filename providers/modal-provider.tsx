"use client";

import { useEffect, useState } from "react";

import { ClientModal } from "@/components/modals/client-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ClientModal />
    </>
  );
};
