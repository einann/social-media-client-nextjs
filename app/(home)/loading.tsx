export default function Loading() {
    return (
        <div className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500 to-amber-500 animate-spin fixed left-1/2 top-1/2">
                <div className="h-9 w-9 rounded-full bg-gray-500/70"></div>
            </div>
        </div>
    )
}