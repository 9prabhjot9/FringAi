'use client'
import { supabase } from '@/services/supabase'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Header from './_components/Header'

function SearchQueryResult() {
    const {libId} = useParams()
    console.log(libId)
    const [searchInputRecord, setSearchInputRecord] = useState()

    useEffect(() => {
        getSearchQueryRecord()
    },[])

    const getSearchQueryRecord = async () => {

        let {data: Library, error} = await supabase
        .from('Library')
        .select('*')
        .eq('libId', libId)

        console.log(Library[0])
        setSearchInputRecord(Library[0])
    }

  return (
    <div>
      <Header searchInputRecord={searchInputRecord}/>
    </div>
  )
}

export default SearchQueryResult
