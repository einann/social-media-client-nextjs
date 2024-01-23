import Image from "next/image";
import FollowButton from "./FollowButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserType } from "@/lib/user.type";
import { FollowingListType } from "@/lib/following-list.type";

export default async function ProfileInfo({ user, followingList }: { user: UserType, followingList: FollowingListType[] }) {
    const session = await getServerSession(authOptions);
    const isFollowedByMyUser = followingList.find(list => list.following.username === user.username);
    return (
        <div className='flex flex-row border w-full gap-3 p-0.5 bg-slate-100 rounded-md'>
            <Image
                src={user.profilePicture}
                alt="Profile Picture"
                width={100}
                height={100}
                className="rounded-full border-2 border-cyan-700"
            />
            <div className="flex flex-row justify-between w-full p-2 items-center">
                <div className="flex flex-col">
                    <span className="font-bold text-slate-700">{`${user.firstName} ${user.lastName}`}</span>
                    <span className="text-slate-500">{user.username}</span>
                </div>
                <div className={`${session?.user.username === user.username ? 'hidden' : 'block'}`}>
                    <FollowButton user={user} isFollowedByMe={isFollowedByMyUser ? true : false} />
                </div>
            </div>
        </div>
    )
}
