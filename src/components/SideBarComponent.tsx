import React from "react";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Separator } from "./ui/separator";

const SideBarComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="m-5">
          <div className="flex h-5 items-center space-x-3 text-sm mb-3">
            <SidebarTrigger />
            <Separator orientation="vertical" />
            <div className="font-semibold">Dashboard</div>
          </div>
          {children}
        </main>
      </SidebarProvider>
    </>
  );
};

export default SideBarComponent;
