"use client"

import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { supabase } from '@/services/supabase'
import { UserDetailContext } from '@/context/UserDetailContext'

function Provider({ children }) {
  const { user } = useUser()
  const [userDetail, setUserDetail] = useState()

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      CreateNewUser()
    }
  }, [user])

  const CreateNewUser = async () => {
    try {
      let { data: Users, error } = await supabase
        .from('Users')
        .select('*')
        .eq('email', user.primaryEmailAddress.emailAddress)

      if (error) {
        console.error("Supabase select error:", error)
        return
      }

      console.log("Existing users:", Users)

      if (!Users || Users.length === 0) {
        const { data, error: insertError } = await supabase
          .from('Users')
          .insert([
            {
              name: user.fullName,
              email: user.primaryEmailAddress.emailAddress
            },
          ])
          .select()

          console.log("Inserted user:", data)
          setUserDetail(data[0])
          return
      }
      setUserDetail(Users[0])

    } catch (err) {
      console.error("Unexpected error:", err)
    }
  }

  return (
    <UserDetailContext value={{userDetail, setUserDetail}}> 
      <div>{children}</div>
    </UserDetailContext>
  )
}

export default Provider