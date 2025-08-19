"use client"

import React, { useEffect, useState } from 'react'
import { supabase } from '@/services/supabase'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { SquareArrowOutUpRight } from 'lucide-react'
import { useRouter } from 'next/navigation'


function Library() {

    const { user } = useUser()
    const [ libraryHistory, setLibraryHistory ] = useState()
    const router = useRouter()

    useEffect(() => {
        user&&GetLibraryHistory()
    }, [user])

  
    const GetLibraryHistory=async() => {
    let { data: Library, error } = await supabase
    .from('Library')
    .select('*')
    .eq('userEmail', user?.primaryEmailAddress?.emailAddress)
    console.log(Library)
    setLibraryHistory(Library)
          
    }
  return (
    <div className='mt-20 md:px-10 lg:px-36 xl:px-56'>
      <h2 className='font-bold text-3xl'> Library </h2>
      <div className='mt-5'>
        {libraryHistory?.map((item,index) => (
            <div key={index} onClick={()=>router.push('/search/' + item.libId) } >
                <div className='flex justify-between cursor-pointer'> 
                    <div> 
                        <h2 className='font-bold'>{item.searchInput} </h2>
                        <p className='text-sx text-gray-600'>{ moment(item.created_at).fromNow()} </p>
                       
                    </div>
                    <SquareArrowOutUpRight className='h-4 w-4'/>
                </div>
                 <hr className='my-4'/>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Library
