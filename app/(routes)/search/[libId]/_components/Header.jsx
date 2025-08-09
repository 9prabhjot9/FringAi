import { UserButton } from '@clerk/nextjs'
import { Clock } from 'lucide-react'
import moment from 'moment'
import React from 'react'

function Header( { searchInputRecord } ) {
  return (
    <div className='p-4 border-b w-screen'> 
        <div className='flex gap-2 items-center'>
            <UserButton />
            <div className='flex gap-1 items-center'>
                <Clock className='h-5 w-5 text-slate-500'/>
                <h2 className='text-sm text-slate-500'>{moment (searchInputRecord?.created_at).fromNow()} </h2>
            </div>
      </div>
    </div>
  )
}

export default Header
