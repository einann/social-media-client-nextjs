import Entry from '@/app/components/Entry/Entry'
import Comment from '@/app/components/Comment/Comment';
import CommentSomething from '@/app/components/CommentSomething';
import { globalFetch_server } from '@/util/globalFetch_server';
import { transformRequest } from '@/util/transformRequest';
import { EntryType } from '@/lib/entry.type';
import { UserType } from '@/lib/user.type';

export default async function EntryDetail({ params }: { params: { id: string } }) {
    const filter = transformRequest(`entryId==${params.id}`, 'FullDto');
    const data: EntryType[] = await globalFetch_server('entries/get', 'POST', filter);

    const usernames = [...new Set(data.map(item => item.createdUser))].join(",");
    const userFilter = transformRequest(`username==${usernames}`);
    const users: UserType[] = await globalFetch_server("users/get", "POST", userFilter);

    if (users && users.length) {
        data.forEach(item => {
            const userOfEntry = users.find(user => user.username === item.createdUser);
            if (userOfEntry) item.createdUser = userOfEntry;
        });
    }
    return (
        <>
            <main className={`p-2 mt-2 flex flex-col w-full`}>
                <Entry data={data[0]} isDetail={true} />
                <CommentSomething parentId={data[0].entryId} />
                <Comment parentId={data[0].entryId} />
            </main>
        </>
    )
}
