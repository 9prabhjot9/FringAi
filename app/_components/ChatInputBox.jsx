import Image from "next/image";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Atom, AudioLines, Cpu, Globe, Mic, Paperclip, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AIModelsOption } from "@/services/Shared";




function ChatInputBox() {
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center">
            <Image src="/newlogo.png" alt="logo" width={150} height={100} />

            <div className="p-2 w-full max-w-3xl ">
                <div className="w-full border border-gray-300 p-5 rounded-2xl flex justify-between items-end">
                    <div className="text-gray-500 mb-4"></div>

                    <Tabs defaultValue="account" className="w-full border-none">
                        <TabsContent value="account">
                            <input
                                type="text"
                                placeholder="Ask Anything"
                                className="w-full focus: outline-none rounded-md"
                            />
                        </TabsContent>

                        <TabsContent value="password">
                            <input
                                type="text"
                                placeholder="Research Anything"
                                className="w-full rounded-md focus: outline-none"
                            />
                        </TabsContent>

                        <TabsList className="mt-3 flex gap-2">
                            <TabsTrigger value="account" className={'text-[#438c86] font-semibold'}><Search/> Search</TabsTrigger>
                            <TabsTrigger value="password" className={'text-[#438c86] font-semibold'}><Atom/> DeepResearch</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <div className="flex text-gray-500 gap-3 items-center">
                        <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div className=" hover:lg hover:bg-slate-200 rounded-sm">
                            <Cpu />
                            </div>

                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {AIModelsOption.map((model, index) => (
                                <DropdownMenuItem key={index}>
                                    <div className="mb-1">
                                        <h2 className="text-sm font-semibold">{model.name}</h2>
                                        <p className="text-xs">{model.desc} </p>
                                    </div>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                        </DropdownMenu>
                        <button className=" hover:lg hover:bg-slate-200 rounded-sm">
                            <Globe />
                        </button>
                        <button className=" hover:lg hover:bg-slate-200 rounded-sm">
                            <Paperclip />
                        </button>
                        <button className=" hover:lg hover:bg-slate-200 rounded-sm">
                        <Mic />
                        </button>
                        <button className="bg-[#438c86] text-white p-1 rounded-sm">
                            <AudioLines />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatInputBox;