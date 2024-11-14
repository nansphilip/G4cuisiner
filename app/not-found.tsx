import ButtonClient from "@comps/client/button";

export default function NotFoundPage() {
    return <>
        <h1 className="text-2xl font-bold">Oh no!</h1>
        <p>The page you are looking for does not exist.</p>
        <div className="flex flex-row items-center justify-center gap-2">
            <ButtonClient type="link" href="/">Home</ButtonClient>
        </div>
    </>
}