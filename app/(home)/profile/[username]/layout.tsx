import ProfileInfo from "./Components/ProfileInfo";
import FollowInfo from "./Components/FollowInfo";
import ProfileTabs from "./Components/ProfileTabs";
import { transformRequest } from "@/util/transformRequest";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserType } from "@/lib/user.type";
import { notFound } from "next/navigation";

type LayoutProps = {
    children?: React.ReactNode,
    params: { username: string },
};

export default async function UserLayout({ children, params }: LayoutProps) {
    const username = params.username;
    const session = await getServerSession(authOptions);
    const filter = transformRequest(`username==${username}`);
    const res = await fetch(`${process.env.BACKEND_URL}/users/get`, {
        method: "POST",
        body: JSON.stringify(filter),
        headers: {
            "Authorization": `Bearer ${session?.tokens.access_token}`,
            "Content-Type": "application/json"
        }
    });
    const result: UserType[] = await res.json();
    if (!result.length) {
        notFound();
    }
    const user = result[0];

    const getFollowingList = async () => {
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
    const followingList = await getFollowingList();

    return (
        <main className='flex flex-col p-4 w-full gap-3'>
            {/* profile info -> picure, first and last names, username + follow/unfollow button */}
            <ProfileInfo user={user} followingList={followingList} />

            {/* Following and follower buttons */}
            <FollowInfo user={user} />

            {/* entrytab, commentstab, likestab */}
            <ProfileTabs />

            {/* Content based on selected tab - entry list */}
            <div className="p-2 w-full border rounded-md">
                {children}
            </div>
        </main>
    )
}
