import { Button } from "@/components/ui/button";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import Image from "next/image";
import ChatInputBox from "./_components/ChatInputBox";


export default function Home() {
  return (
    <div> 
      <ChatInputBox />
    </div>

  )
}
