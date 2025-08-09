'use client'
import { supabase } from '@/services/supabase'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

function SearchQueryResult() {
    const {libId} = useParams()
    console.log(libId)

    useEffect(() => {
        getSearchQueryRecord()
    },[])

    const getSearchQueryRecord = async () => {

        let {data: Library, error} = await supabase
        .from('Library')
        .select('*')
        .eq('libId', libId)

        console.log(Library[0])
    }

  return (
    <div>
      searcqueryresult
    </div>
  )
}

export default SearchQueryResult
