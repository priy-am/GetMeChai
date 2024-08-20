"use client"
import React from 'react'
import { SessionProvider } from "next-auth/react"

const SessionWapper = ({children}) => {
  return (
    <div>
      <SessionProvider >
        {children}
      </SessionProvider>
    </div>
  )
}

export default SessionWapper
