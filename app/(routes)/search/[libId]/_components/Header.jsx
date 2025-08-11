import { UserButton } from '@clerk/nextjs'
import { Clock, Link, Send } from 'lucide-react'
import moment from 'moment'
import React from 'react'
import { Button } from '@/components/ui/button'

function Header( { searchInputRecord } ) {
  return (
    <div className='p-4 border-b w-screen flex justify-between items-center'> 
        <div className='flex gap-2 items-center'>
            <UserButton />
            <div className='flex gap-1 items-center'>
                <Clock className='h-5 w-5 text-slate-500'/>
                <h2 className='text-sm text-slate-500'>{moment (searchInputRecord?.created_at).fromNow()} </h2>
            </div>
        <div className=' flex ' >
        <h2 className='line-clamp-1 '>{searchInputRecord?.searchInput} </h2>
        </div>

      </div>
      <div className='flex gap-3'>
        <Button><Link /></Button>
        <Button><Send/>Send</Button> 
      </div>
    </div>
  )
}

export default Header
