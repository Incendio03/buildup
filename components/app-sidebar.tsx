"use client";

import * as React from "react";
import {
  IconBug,
  IconCalendarStats,
  IconCashBanknoteHeart,
  IconGolf,
  IconHome,
  IconInnerShadowTop,
  IconPigMoney,
  IconUserQuestion,
} from "@tabler/icons-react";

import { NavMaribank } from "@/components/nav-maribank";
import { NavMaya } from "@/components/nav-maya";
import { NavPagibig } from "./nav-pagibig";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: IconHome,
    },
  ],
  maya: [
    {
      name: "Savings",
      url: "/dashboard/maya-savings",
      icon: IconPigMoney,
    },
    {
      name: "Time Deposit",
      url: "/dashboard/maya-time-deposit",
      icon: IconCalendarStats,
    },
    {
      name: "Personal Goals",
      url: "/dashboard/maya-personal-goals",
      icon: IconGolf,
    },
  ],
  maribank: [
    {
      name: "Savings",
      url: "#",
      icon: IconPigMoney,
    },
  ],
  pagibig: [
    {
      name: "Mp2 Savings",
      url: "#",
      icon: IconPigMoney,
    },
  ],
  navSecondary: [
    {
      title: "Feedback",
      url: "#",
      icon: IconUserQuestion,
    },
    {
      title: "Support BuildUp",
      url: "/dashboard/support-buildup",
      icon: IconCashBanknoteHeart,
    },
    {
      title: "Bug/Problem Reports",
      url: "#",
      icon: IconBug,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 hover:bg-transparent cursor-default"
            >
              <a href="/dashboard">
                <IconInnerShadowTop className="!size-5 text-primary" />
                <span className="text-base text-primary font-semibold">
                  BuildUp
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavMaya items={data.maya} />
        <NavMaribank items={data.maribank} />
        <NavPagibig items={data.pagibig} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
