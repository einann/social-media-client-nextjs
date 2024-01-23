import { transformRequest } from "@/util/transformRequest";
import { EntryType } from "@/lib/entry.type";
import { globalFetch_server } from "@/util/globalFetch_server";
import Entry from "@/app/components/Entry/Entry";
import { UserType } from "@/lib/user.type";

export default async function UserEntries({ params }: { params: { username: string } }) {
    const filter = transformRequest(`createdUser==${params.username}`, "FullDto");
    const userEntries: EntryType[] = await globalFetch_server("entries/get", "POST", filter);

    if (userEntries && userEntries.length) {
        const usernames = [...new Set(userEntries.map(item => item.createdUser))].join(",");
        const userFilter = transformRequest(`username==${usernames}`);
        const users: UserType[] = await globalFetch_server("users/get", "POST", userFilter);
        if (users && users.length) {
            userEntries.forEach(item => {
                const userOfEntry = users.find(user => user.username === item.createdUser);
                if (userOfEntry) item.createdUser = userOfEntry;
            });
        }
    }

    return (
        <div>
            {userEntries.length ? userEntries.map(entry => {
                return (
                    <Entry key={entry.entryId} data={entry} isDetail={true} />
                )
            }) : (
                <div className="w-full text-center">No entries yet.</div>
            )}
        </div>
    )
}
