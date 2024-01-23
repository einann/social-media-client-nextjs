import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { FollowingListType } from "@/lib/following-list.type";
import { UserType } from "@/lib/user.type";
import { transformRequest } from "@/util/transformRequest";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function FollowInfo({ user }: { user: UserType }) {
    const session = await getServerSession(authOptions);
    const getFollowingList = async () => {
        const filter = transformRequest(`follower==${user.username}`);
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

    const getFollowerList = async () => {
        const filter = transformRequest(`following==${user.username}`);
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
    const follower: FollowingListType[] = await getFollowerList();

    return (
        <div className="flex flex-row border w-full gap-5 p-0.5 justify-between md:justify-start bg-slate-100 rounded-md">
            <Link href={`/profile/${user.username}/following`}>
                <span className="mx-2 font-bold">{following.length}</span>
                <span className="text-slate-500">Following</span>
            </Link>
            <Link href={`/profile/${user.username}/followers`}>
                <span className="mx-2 font-bold">{follower.length}</span>
                <span className="mr-2 text-slate-500">Followers</span>
            </Link>
        </div>
    )
}
