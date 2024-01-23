"use client";

import { UserType } from "@/lib/user.type";
import { useSession } from "next-auth/react";
import { useState } from "react";

type FollowButonProps = {
    user: UserType,
    isFollowedByMe: boolean | undefined,
}

export default function FollowButton({ user, isFollowedByMe }: FollowButonProps) {
    const { data: session } = useSession();
    const [isLoading, setLoading] = useState(false);
    const [isFollowing, setFollowing] = useState(isFollowedByMe);
    
    async function onUnfollowUser() {
        setLoading(true);
        const unfollowObj = {
            following: user.username,
            follower: session?.user.username,
        };
        const res = await fetch(`http://localhost:3001/following-list`, {
            method: "DELETE",
            body: JSON.stringify(unfollowObj),
            headers: {
                "Authorization": `Bearer ${session?.tokens.access_token}`,
                "Content-Type": "application/json"
            }
        });

        if (res.ok) {
            setFollowing(false);
        }
        setLoading(false);
    }

    async function onFollowUser() {
        setLoading(true);
        const followObj = {
            following: user.username,
            follower: session?.user.username,
        };
        const res = await fetch(`http://localhost:3001/following-list`, {
            method: "POST",
            body: JSON.stringify(followObj),
            headers: {
                "Authorization": `Bearer ${session?.tokens.access_token}`,
                "Content-Type": "application/json"
            }
        });

        if (res.ok) {
            setFollowing(true);
        }
        setLoading(false);
    }
    return (
        <div>
            {isFollowing ? (
                <button
                    disabled={isLoading}
                    onClick={onUnfollowUser}
                    className='text-white bg-pink-600 py-1 px-3 rounded-md shadow-lg shadow-pink-600/50 hover:bg-pink-700 transition disabled:bg-pink-600/50'
                >
                    {isLoading ? 'Processing...' : 'Unfollow'}
                </button>
            ) : (
                <button
                    onClick={onFollowUser}
                    className='text-white bg-cyan-600 py-1 px-3 rounded-md shadow-lg shadow-cyan-600/50 hover:bg-cyan-700 transition'
                >
                    Follow
                </button>
            )}
        </div>
    )
}
