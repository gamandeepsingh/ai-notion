"use client"
import {
    LiveblocksProvider
  } from "@liveblocks/react/suspense";
import { ReactNode } from 'react'

const LiveblocksProviderWrapper = ({children}:{
    children: ReactNode
}) => {
    if(!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY) {
        throw new Error("Missing NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY env variable")
    }
  return (
    <LiveblocksProvider
    throttle={16}
    authEndpoint={"/auth-endpoint"}>
      {children}
    </LiveblocksProvider>
  )
}

export default LiveblocksProviderWrapper
