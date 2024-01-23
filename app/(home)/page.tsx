import ShareSomething from "../components/ShareSomething";
import Entry from "../components/Entry/Entry";
import { transformRequest } from "@/util/transformRequest";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { globalFetch_server } from "@/util/globalFetch_server";
import { UserType } from "@/lib/user.type";
import { FollowingListType } from "@/lib/following-list.type";
import { EntryType } from "@/lib/entry.type";

export default async function Home() {
    const session = await getServerSession(authOptions);

    const followingListFilter = transformRequest(`follower==${session?.user.username}`);
    const users: FollowingListType[] = await globalFetch_server("following-list/get_following", "POST", followingListFilter);
    const userList = users.map(item => item.following);

    const entryFilter = transformRequest("createdUser==" + userList.map(item => item.username) + "," + session?.user.username, "FullDto");

    const entries: EntryType[] = await globalFetch_server("entries/get", "POST", entryFilter);

    entries.forEach(entry => {
        const userOfEntry = userList.find(user => user.username === entry.createdUser);
        if (userOfEntry) entry.createdUser = userOfEntry;
    });

    // To be coded...
    const onAddNewEntry = () => {
        
    }

    return (

        <main className="p-2 w-full md:p-5">
            {/* Share Something */}
            <ShareSomething />

            {/* Entries */}
            {entries.map(data => {
                return (
                    <Entry key={data.entryId} data={data} isDetail={false} />
                )
            })}
        </main>
    )
}
