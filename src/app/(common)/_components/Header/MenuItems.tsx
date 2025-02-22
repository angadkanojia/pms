import DashboardIcon from "@/app/(common)/_components/Icons/DashboardIcon";
import LibraryIcon from "@/app/(common)/_components/Icons/LibraryIcon";
import ProposalsIcon from "@/app/(common)/_components/Icons/ProposalsIcon";
import SectionBuilderIcon from "@/app/(common)/_components/Icons/SectionBuilderIcon";
import ContactIcon from "@/app/(common)/_components/Icons/ContactIcon";
import UsersIcon from "@/app/(common)/_components/Icons/UsersIcon";
import SettingsIcon from "@/app/(common)/_components/Icons/SettingsIcon";

export const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    title: "Library",
    href: "/librarys",
    icon: <LibraryIcon />,
  },
  {
    title: "Proposals",
    href: "/proposals",
    icon: <ProposalsIcon />,
  },
  {
    title: "Section Builder",
    href: "/section-builder",
    icon: <SectionBuilderIcon width="22" height="22" />,
  },
  {
    title: "Contact",
    href: "/contact",
    icon: <ContactIcon />,
  },
  {
    title: "Users",
    href: "/users",
    icon: <UsersIcon />,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <SettingsIcon />,
  },
];
