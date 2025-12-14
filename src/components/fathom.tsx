"use client"

import { load, trackPageview } from "fathom-client"
import { useEffect, Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"

function TrackPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Load the Fathom script on mount
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true")
      load(process.env.NEXT_PUBLIC_FATHOM_SITE_ID as string, {
        includedDomains: ["safepeek.org", "safepeek-web.ngrok.io"],
        auto: false,
      })
  }, [])

  // Record a pageview when route changes
  useEffect(() => {
    if (!pathname) return

    trackPageview({
      url: pathname + searchParams.toString(),
      referrer: document.referrer,
    })
  }, [pathname, searchParams])

  return null
}

export default function Fathom() {
  return (
    <Suspense fallback={null}>
      <TrackPageView />
    </Suspense>
  )
}
