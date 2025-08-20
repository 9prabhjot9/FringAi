"use client"
import { Home,  Compass, Library, LogIn } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../components/ui/sidebar"
import { usePathname } from "next/navigation"
import { Button } from "../../components/ui/button"
import { SignUpButton, UserButton } from "@clerk/nextjs"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Library",
    url: "/library",
    icon: Library,
  },
  {
    title: "Sign In",
    url: "/signin",
    icon: LogIn,
  },
]

export function AppSidebar() {
    const path = usePathname()
  return (
    <Sidebar >
      <SidebarContent className='bg-[#dcfcf4]'>
        <SidebarGroup>
          <SidebarGroupLabel className='flex items-center py-13 '>
            <img src={'/fringnew.png'} alt="logo" width={7000}  />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                  asChild 
                  className={`p-6 hover:bg-transparent hover:font-bold ${path?.includes(item.url) && 'font-bold'}`}>
                    <a href={item.url}>
                      <item.icon className="h-8 w-8"/>
                      <span className="text-lg  ">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

            <SignUpButton mode="modal"> 
            <Button className={'text-black ml-5 w-40 mt-5 rounded-full bg-[#438c86]'}>Sign Up</Button>
            </SignUpButton>

          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
            <div className="p-9 bg-[#dcfcf4]">
                <h1 className="text-gray-500">Try Now</h1>
                <p className="text-gray-400">Upgrade to premium for image upload and smarter AI</p>
                <UserButton />
            </div>
    </Sidebar>
  )
}