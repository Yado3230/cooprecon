"use client";

import { LoginPage } from "./(auth)/login-page";

export default function RootPage() {
  return (
    <main className="p-5 flex items-center justify-center h-screen relative">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-no-repeat" />

      {/* Overlay with Background Color and Opacity */}
      <div className="absolute inset-0 bg-cyan-500 opacity-20" />

      <div className="z-[100]">
        <LoginPage />
      </div>
    </main>
  );
}
