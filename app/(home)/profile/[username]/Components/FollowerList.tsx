import Image from 'next/image'
import Link from 'next/link'
import FollowButton from './FollowButton'
import { FollowerListType, FollowingListType } from '@/lib/following-list.type'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { transformRequest } from '@/util/transformRequest'

export default async function FollowerList({ username }: { username: string }) {
    const session = await getServerSession(authOptions);

    const getFollowerList = async () => {
        const filter = transformRequest(`following==${username}`);
        const res = await fetch(`${process.env.BACKEND_URL}/following-list/get_followers`, {
            method: "POST",
            body: JSON.stringify(filter),
            headers: {
                "Authorization": `Bearer ${session?.tokens.access_token}`,
                "Content-Type": "application/json"
            }
        });
        return await res.json()
    }
    const followers: FollowerListType[] = await getFollowerList();

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

    followers.forEach(item => {
        item.isFollowedByMe = false;
        const isFollowedByMe = myFollowingList.find(x => x.following.username === item.follower.username);
        if (isFollowedByMe) item.isFollowedByMe = true;
    });

    return (
        <div className="flex flex-col gap-1 p-2 overflow-y-auto">
            {followers.map(item => {
                return (
                    <div key={item.id} className="w-full border p-2 flex items-center justify-between bg-slate-200 rounded-md">
                        <div className="flex items-center">
                            <Link href={`/profile/${item.follower.username}`} className="mr-2">
                                <Image
                                    src={item.follower.profilePicture}
                                    alt="PP"
                                    width={30}
                                    height={30}
                                    className="rounded-full"
                                />
                            </Link>
                            <div className="flex flex-col">
                                <span className="font-semibold hover:underline"><Link href={`/profile/${item.follower.username}`}>{item.follower.firstName} {item.follower.lastName}</Link></span>
                                <span className="text-sm text-slate-500 cursor-default">{item.follower.username}</span>
                            </div>
                        </div>
                        <div className={`${item.follower.username === session?.user.username ? 'hidden' : 'block'}`}>
                            <FollowButton user={item.follower} isFollowedByMe={item.isFollowedByMe} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
