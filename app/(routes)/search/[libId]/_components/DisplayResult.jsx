import React, { useEffect, useState } from 'react'
import { LucideSparkles } from 'lucide-react';
import { LucideImage } from 'lucide-react';
import { LucideVideo } from 'lucide-react';
import { LucideList } from 'lucide-react';
import AnswerDisplay from './AnswerDisplay';
import axios from 'axios';

import { useParams } from 'next/navigation';
import { supabase } from '@/services/supabase';
import ImageList from './ImageList';
import SourceListTab from './SourceListTab';



const tabs = [
  { label: 'Answer', icon: LucideSparkles },
  { label: 'Images', icon: LucideImage },
  { label: 'Videos', icon: LucideVideo },
  { label: 'Sources', icon: LucideList, badge: 10 },
];

function DisplayResult({searchInputRecord}) {
    const [activeTab, setActiveTab] = useState("Answer")
    const[searchResult, setSearchResult ] = useState(searchInputRecord)
    const {libId} = useParams()

    useEffect(() => {   
        
        searchInputRecord?.Chats?.length==0 ? GetSearchApiResult(): getSearchRecords()
        setSearchResult(searchInputRecord)
        console.log(searchInputRecord)
    }, [searchInputRecord])

   const GetSearchApiResult = async () => {
    const result = await axios.post('/api/google-search-api', {
      searchInput: searchInputRecord?.searchInput,
      searchType: searchInputRecord?.type
    })
    const searchResp= result?.data


    // console.log("Full searchResp:", searchResp);
    // console.log("Items array:", searchResp?.items);
    // console.log("First item:", searchResp?.items?.[0]);

    const formattedSearchResponse = searchResp?.items?.map((item) => ({
        title: item?.title ?? null,
        snippet: item?.snippet ?? null,
        displayLink: item?.displayLink ?? null,
        src: item?.pagemap?.cse_thumbnail?.[0]?.src 
          || item?.pagemap?.cse_image?.[0]?.src,
        link: item?.link ?? null
    }));

    console.log("Formatted search response:", formattedSearchResponse);
    const cleanResults = formattedSearchResponse.map((obj) =>
    Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, v === undefined ? null : v])
    )
  );

console.log(cleanResults);

    const { data, error } = await supabase
    .from('Chats')
    .insert([
        { libId: libId,
          searchResult: cleanResults,
          userSearchInput: searchInputRecord?.searchInput
        },
    ])
    .select()
    await getSearchRecords()
       


await GenerateAIResp(formattedSearchResponse, data[0].id);
   
  }

  const GenerateAIResp=async(formattedSearchResponse, recordId) => {

      const result = await axios.post('/api/llm-model', {
        searchInput: searchInputRecord?.searchInput,
        searchResult: formattedSearchResponse,
        recordId: recordId
      })

      console.log(result.data)
      const runId = result.data

      const interval = setInterval(async() => {
        const runResp = await axios.post('/api/get-inngest-status', {
          runId: runId
        })
        if(runResp?.data?.data[0]?.status == "Completed"){
          console.log("Completed!!!")
          await getSearchRecords()
            clearInterval(interval)
        }
      }, 1000)
      
  }

  const getSearchRecords=async() => {

            let {data: Library, error} = await supabase
            .from('Library')
            .select('*, Chats(*)')
            .eq('libId', libId)

            setSearchResult(Library[0])
  }



    return (
        <div className='mt-7'>
          {searchResult?.Chats?.slice(-1).map((chat, index) => (
            <div key={index}>
               <h2 className='font-medium text-2xl line-clamp-2 pt-4'>{chat?.userSearchInput} </h2>
                 <div className="flex items-center space-x-6 border-b border-gray-200 pb-2 mt-8">
    
  {tabs.map(({ label, icon: Icon, badge }) => (
    <button
      key={label}
      onClick={() => setActiveTab(label)}
      className={`flex items-center gap-1 relative text-sm font-medium text-gray-700 hover:text-black ${activeTab === label ? 'text-black' : ''}`}
    >
      
      <Icon className="w-4 h-4" />
      <span>{label}</span>
      {badge && (
        <span className="ml-1 text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
          {badge}
        </span>
      )}
      {activeTab === label && (
        <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-black rounded"></span>
      )}
    </button>
  ))}
  <div className="ml-auto text-sm text-gray-500">
    1 task <span className="ml-1">→</span>
    
  </div>
    </div>
    <div>
        {activeTab == 'Answer'? <AnswerDisplay chat={chat}/> : 
        activeTab== 'Images'?<ImageList chat={chat}/>
        : activeTab == 'Sources' ? <SourceListTab chat={chat} /> : null
      }
        
        
     </div>
     <hr className='my-5'/>
            </div>
          ))}
     
    
   
</div>

  )
}

export default DisplayResult
