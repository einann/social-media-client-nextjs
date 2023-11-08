import ShareSomething from "../components/ShareSomething";
import Entry from "./Entry/Entry";

export default function Home() {
    return (
        <main className="p-2 w-full md:p-5">
            {/* Share Something */}
            <ShareSomething />

            {/* Entries */}
            <Entry />
        </main>
    )
}
