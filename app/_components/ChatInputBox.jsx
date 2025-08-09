'use client'
import Image from "next/image";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Atom, AudioLines, Cpu, Globe, Mic, Paperclip, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AIModelsOption } from "@/services/Shared";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/services/supabase";
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from "next/navigation";





function ChatInputBox() {

        const[userSearchInput, setUserSearchInput] = useState()
        const[searchType, setSearchType] = useState()
        const {user} = useUser()
        const [loading, setLoading] = useState(false)
        const router = useRouter()

        const onSearchQuery = async() => {
            setLoading(true)
            const libId = uuidv4()
            const {data} = await supabase.from('Library').insert([
                {
                    searchInput: userSearchInput,
                    userEmail: user?.primaryEmailAddress?.emailAddress,
                    type: searchType,
                    libId: libId
                }
            ]).select()
            setLoading(false)

            router.push('/search/' + libId)
            console.log(data)
        }

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center">
            <Image src="/newlogo.png" alt="logo" width={150} height={100} />

            <div className="p-2 w-full max-w-3xl ">
                <div className="w-full border border-gray-300 p-5 rounded-2xl flex justify-between items-end">
                    <div className="text-gray-500 mb-4"></div>

                    <Tabs defaultValue="Search" className="w-full border-none">
                        <TabsContent value="Search">
                            <input
                                type="text"
                                placeholder="Ask Anything"
                                className="w-full focus: outline-none rounded-md"
                                onChange={(e) => setUserSearchInput(e.target.value)}
                            />
                        </TabsContent>

                        <TabsContent value="Research">
                            <input
                                type="text"
                                placeholder="Research Anything"
                                className="w-full rounded-md focus: outline-none"
                                onChange={(e) => setUserSearchInput(e.target.value)}
                            />
                        </TabsContent>

                        <TabsList className="mt-3 flex gap-2">
                            <TabsTrigger value="Search" className={'text-[#438c86] font-semibold'}  onClick={()=>setSearchType('search')}><Search/> Search</TabsTrigger>
                            <TabsTrigger value="Research" className={'text-[#438c86] font-semibold'}  onClick={()=>setSearchType('research')}><Atom/> DeepResearch</TabsTrigger>
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
                        <button 
                         className="bg-[#438c86] text-white p-1 rounded-sm"
                         onClick={() => {
                            userSearchInput ? onSearchQuery() : null }}>
                          {!userSearchInput?<AudioLines />: <ArrowRight disabled={loading}/>}
                        </button>
                    </div>
                
                </div>
            </div>
        </div>
    );
}

export default ChatInputBox;