"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function ProfileTabs() {
    const { data: session } = useSession();
    const pathname = usePathname();
    const currentRoute = pathname.split("/").at(-1)!;
    return (
        <div className={`flex flex-row border px-2 w-full h-7 justify-between bg-slate-100 rounded-md font-bold ${!session && 'opactiy-50'}`}>
            <Link href={`/profile/${session?.user.username}`} className={`px-2 ${!['comments', 'likes'].includes(currentRoute) && 'border-b-2 border-cyan-600'}`}>Entries</Link>
            <Link href={`/profile/${session?.user.username}/comments`} className={`px-2 ${currentRoute === 'comments' && 'border-b-2 border-cyan-600'}`}>Comments</Link>
            <Link href={`/profile/${session?.user.username}/likes`} className={`px-2 ${currentRoute === 'likes' && 'border-b-2 border-cyan-600'}`}>Likes</Link>
        </div>
    )
}
