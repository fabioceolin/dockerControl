import { Stack } from "@chakra-ui/react";
import { RiDashboardLine, RiCheckboxIndeterminateLine, RiBarChartHorizontalFill } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SideBarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GENERAL">
        <NavLink icon={RiDashboardLine} href="/" shouldMatchExactHref>Dashboard</NavLink>
        <NavLink icon={RiCheckboxIndeterminateLine} href="/containers">Containers</NavLink>
        <NavLink icon={RiBarChartHorizontalFill} href="/images">Images</NavLink>
      </NavSection>
    </Stack>
  )
}