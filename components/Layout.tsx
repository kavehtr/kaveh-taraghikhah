import React, { PropsWithChildren } from "react";
import Header from "./Header";


export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full">{children}</main>
      <footer className="text-sm text-slate-400 py-6 text-center">
        © {new Date().getFullYear()} — Built with passion for robots and control
        systems
      </footer>
    </div>
  );
}
