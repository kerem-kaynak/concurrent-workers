"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import React, { useState } from "react"

import { trpc } from "./client"

const baseUrl = process.env.VERCEL_ENV == 'development' ? "http://localhost:3000" : `https://concurrent-workers.vercel.app` 

export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({}))
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${baseUrl}/api/trpc`,
        }),
      ],
    })
  )
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}