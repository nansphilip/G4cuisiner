"use client"

import Button from "@comps/server/button"
import { useEffect } from "react"

export default function ErrorPage({ error, reset }: {
    error: Error,
    reset: () => void
}) {

    useEffect(() => {
        // console.clear()
        // console.log(error.message as string)
    }, [error])

    return <>
        <h1 className="text-2xl font-bold">An error occurred</h1>
        <p>{error.message}</p>
        <div className="flex flex-row items-center justify-center gap-2">
            <Button type="link" href="/">Home</Button>
            <Button type="button" onClick={reset} variant="outline">Retry</Button>
        </div>
    </>
}