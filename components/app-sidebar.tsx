"use client"

import {
  Sidebar,
  SidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { FadeIn } from "@/components/animation/fade-in"

function PageSidebar() {
  const { content } = useSidebar()
  if (content != null) {
    return (
      <SidebarMenu className="mb-12 px-8 text-xs">
        <span className="font-bold p-2 select-none text-foreground/50">FreeTacMan</span>
        {content.map((item) => (
          <Link key={item.text} href={"#" + item.id} className="p-2 rounded-sm hover:bg-o-blue/3 select-none">
            {item.text}
          </Link>
        ))}
      </SidebarMenu>
    )
  } else {
    return <SidebarMenu />
  }
}

export function AppSidebar() {
  return (
    <FadeIn>
      <Sidebar>
        <div className="mt-24">
          <PageSidebar />
        </div>
      </Sidebar>
    </FadeIn>
  )
}


