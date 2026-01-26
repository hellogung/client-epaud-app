import {
  Database,
  FileText,
  HomeIcon,
  ToolCase,
} from "lucide-react"

import { NavMain } from "@/components/sidebar/nav-main"
import { NavUser } from "@/components/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { TeamSwitcher } from "./team-switcher"
import { Link } from "react-router"

// This is sample data.
const data = {
  user: {
    name: "Agung Gumelar",
    email: "gunghello@gmail.com",
    avatar: "/avatars/shadcn.jpg",
    role: "Super Admin",
  },
  teams: [
    {
      name: "EPAUD",
      // logo: GalleryVerticalEnd,
      logo: "/logo-epaud-temp-dark.svg",
      plan: "Free / Premium",
    },
  ],
  navMain: [
    {
      title: "Master Data",
      url: "#",
      icon: Database,
      isActive: false,
      items: [
        {
          title: "Sekolah",
          url: "/panel/data/sekolah",
        },
        {
          title: "Guru (Coming Soon...)",
          url: "#",
        },
        {
          title: "Murid (Coming Soon...)",
          url: "#",
        },
      ],
    },
    {
      title: "Fitur",
      url: "#",
      icon: ToolCase,
      isActive: false,
      items: [
        {
          title: "Buat RPP (Coming Soon...)",
          url: "#",
        },
        {
          title: "Absensi (Coming Soon...)",
          url: "#",
        },
        {
          title: "Nilai (Coming Soon...)",
          url: "#",
        },
      ],
    },
    {
      title: "Laporan",
      url: "#",
      icon: FileText,
      isActive: false,
      items: [
        {
          title: "Coming Soon...",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
