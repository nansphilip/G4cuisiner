"use client"

import { FormEvent, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Context } from "@comps/context/client-context"
import { SessionCookies } from "@type/session"
import { Register } from "@actions/auth/register"
import FormFeedback from "@comps/server/form-feedback"
import CsrfFormClient from "@comps/client/csrf"
import Button from "@comps/client/button"
import Loader from "@comps/server/loader"

export default function RegisterClient({ className, children, session }: {
    className: string,
    children: React.ReactNode,
    session: SessionCookies | null
}) {
    const router = useRouter()

    /**
     * Redirect to dashboard if the user is already logged in
     * It must be encapsulated in a useEffect to avoid instant redirection
     * after the user login action, it's executed once when the component is mounted
     */
    useEffect(() => {
        if (session) router.push("/dashboard")
        // eslint-disable-next-line
    }, [])

    const [loading, setLoading] = useState(false)
    const [mode, setMode] = useState<"" | "success" | "danger" | "warning">("")
    const [message, setMessage] = useState("")
    const [disabled, setDisabled] = useState(false)

    const client = useContext(Context)
    if (!client) {
        router.refresh()
        return <></>
    }

    const signUp = (e: FormEvent<HTMLFormElement>) => {
        // Prevent the default form submission, and set the loading state
        e.preventDefault()
        setLoading(true)
        setDisabled(true)

        // Call the register function
        const data = {
            firstname: (e.target as HTMLFormElement)["firstname"].value,
            lastname: (e.target as HTMLFormElement)["lastname"].value,
            email: (e.target as HTMLFormElement)["email"].value,
            newPassword: (e.target as HTMLFormElement)["newPassword"].value,
            clientId: client.data.clientId,
        }

        Register(data).then(({ success, error }) => {
            if (success) {
                setLoading(false)
                setMode("success")
                setMessage(success)

                // TODO: add button "open messaging"
            }
            if (error) {
                setLoading(false)
                setMode("danger")
                setMessage(error)
                setDisabled(false)

                const formEl = e.target as HTMLFormElement
                formEl.reset()
            }
        })
    }

    return <CsrfFormClient onSubmit={(e) => signUp(e)} className={className}>
        {children}
        <FormFeedback mode={mode}>{message}</FormFeedback>
        <Button type="submit" disabled={disabled} animation={true} ring="none" className="flex items-center justify-center gap-2">{
            loading ?
                <>
                    <Loader />
                    <span>Loading...</span>
                </> :
                "Register"
        }</Button>
    </CsrfFormClient>
}