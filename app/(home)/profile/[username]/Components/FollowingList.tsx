import Image from 'next/image'
import Link from 'next/link'
import FollowButton from './FollowButton'
import { FollowingListType } from '@/lib/following-list.type'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { transformRequest } from '@/util/transformRequest'

export default async function FollowingList({ username }: { username: string }) {
    const session = await getServerSession(authOptions);

    const getFollowingList = async () => {
        const filter = transformRequest(`follower==${username}`);
        const res = await fetch(`${process.env.BACKEND_URL}/following-list/get_following`, {
            method: "POST",
            body: JSON.stringify(filter),
            headers: {
                "Authorization": `Bearer ${session?.tokens.access_token}`,
                "Content-Type": "application/json"
            }
        });
        return await res.json()
    }
    const following: FollowingListType[] = await getFollowingList();

    const getMyFollowingList = async () => {
        const filter = transformRequest(`follower==${session?.user.username}`);
        const res = await fetch(`${process.env.BACKEND_URL}/following-list/get_following`, {
            method: "POST",
            body: JSON.stringify(filter),
            headers: {
                "Authorization": `Bearer ${session?.tokens.access_token}`,
                "Content-Type": "application/json"
            }
        });
        return await res.json()
    }
    const myFollowingList: FollowingListType[] = await getMyFollowingList();

    following.forEach(item => {
        item.isFollowedByMe = false;
        const isFollowedByMe = myFollowingList.find(x => x.following.username === item.following.username);
        if (isFollowedByMe) item.isFollowedByMe = true;
    });

    return (
        <div className="flex flex-col gap-1 p-2 overflow-y-auto">
            {following.map(item => {
                return (
                    <div key={item.id} className="w-full border p-2 flex items-center justify-between bg-slate-200 rounded-md">
                        <div className="flex items-center">
                            <Link href={`/profile/${item.following.username}`} className="mr-2">
                                <Image
                                    src={item.following.profilePicture}
                                    alt="PP"
                                    width={30}
                                    height={30}
                                    className="rounded-full"
                                />
                            </Link>
                            <div className="flex flex-col">
                                <span className="font-semibold hover:underline"><Link href={`/profile/${item.following.username}`}>{item.following.firstName} {item.following.lastName}</Link></span>
                                <span className="text-sm text-slate-500 cursor-default">{item.following.username}</span>
                            </div>
                        </div>
                        <div className={`${item.following.username === session?.user.username ? 'hidden' : 'block'}`}>
                            <FollowButton user={item.following} isFollowedByMe={item.isFollowedByMe} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
