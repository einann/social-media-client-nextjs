import DummyAvatar from "../../../public/dummy_avatar.png";
import Image from "next/image";
import FollowButton from "./FollowButton";
import Link from "next/link";

type LayoutProps = {
    children?: React.ReactNode,
};

export default function UserLayout({ children }: LayoutProps) {
    return (
        <main className='flex flex-col p-4 w-full gap-3'>
            {/* profile info -> picure, first and last names, username + follow/unfollow button */}
            <div className='flex flex-row border w-full gap-3 p-0.5 bg-slate-100 rounded-md'>
                <Image
                    src={DummyAvatar}
                    alt="Profile Picture"
                    width={100}
                    height={100}
                    className="rounded-full border-2 border-cyan-700"
                />
                <div className="flex flex-row justify-between w-full p-2 items-center">
                    <div className="flex flex-col">
                        <span className="font-bold text-slate-700">Ebubekir İNAN</span>
                        <span className="text-slate-500">einan</span>
                    </div>
                    <div className="">
                        <FollowButton />
                    </div>
                </div>
            </div>

            {/* Following and follower buttons */}
            <div className="flex flex-row border w-full gap-5 p-0.5 justify-between md:justify-start bg-slate-100 rounded-md">
                <Link href="/thisuser/following">
                    <span className="mx-2 font-bold">53</span>
                    <span className="text-slate-500">Following</span>
                </Link>
                <Link href="/thisuser/followers">
                    <span className="mx-2 font-bold">116</span>
                    <span className="mr-2 text-slate-500">Followers</span>
                </Link>
            </div>

            {/* entrytab, commentstab, likestab */}
            <div className="flex flex-row border px-2 w-full justify-between bg-slate-100 rounded-md font-bold">
                <Link href={`/thisuser`} className="px-2 border-b-2 border-cyan-600">Entries</Link>
                <Link href={`/thisuser/comments`} className="px-2">Comments</Link>
                <Link href={`/thisuser/likes`} className="px-2">Likes</Link>
            </div>

            {/* Content based on selected tab - entry list */}
            <div className="p-2 w-full md:p-5 border rounded-md">
                {children}
            </div>
        </main>
    )
}
