"use client";

import Link from 'next/link';
import { LikeType } from '@/lib/like.type';
import { useSession } from 'next-auth/react';
import { BiLike } from 'react-icons/bi';
import { useEffect, useState } from 'react';

export default function LikeButton({ source, likes, id, isDetail }: { source: 'entry' | 'comment', likes: LikeType[], id: string, isDetail: boolean }) {
    const session = useSession();

    const [doLikesIncludeMyUser, setLikesIncludeMyUser] = useState(false);
    const [xyz, setXyz] = useState(likes);

    useEffect(() => {
        if (likes && likes.length) {
            likes.forEach(like => {
                if (like.user.username === session.data?.user.username) {
                    setLikesIncludeMyUser(true);
                }
            });
        }
    }, [session]);

    async function onUndoLike(id: string) {
        const res = await fetch(`http://localhost:3001/likes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.data?.tokens.access_token}`
            }
        });
        if (res.ok) {
            setLikesIncludeMyUser(false);
            const alikes = [...xyz];
            const updated = alikes.filter(x => x.user.username !== session.data?.user.username);
            setXyz(updated);
        }
    }

    async function onLikeEntry() {
        const likeObj = {
            [source]: id,
        };
        const res = await fetch('http://localhost:3001/likes', {
            method: 'POST',
            body: JSON.stringify(likeObj),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.data?.tokens.access_token}`
            }
        });
        if (res.ok) {
            const user = await res.json();
            setLikesIncludeMyUser(true);
            const alikes = [...xyz];
            alikes.push(user);
            setXyz(alikes);
        }
    }

    return (
        <>
            <div className='flex flex-row items-center text-sm'>
                {isDetail && <Link href={`/entry/${id}/likes`} className='mr-0.5 text-slate-400 hover:text-emerald-600'>{xyz && xyz.length}</Link>}
                {!isDetail && <div className='mr-0.5 text-slate-700'>{xyz && xyz.length}</div>}

                {doLikesIncludeMyUser ? (
                    <button
                        onClick={() => onUndoLike(id)}
                        className='flex flex-row items-center hover:text-pink-600 px-2 py-0.5 tranisiton duration-200 rounded-md text-cyan-600'
                    >
                        <BiLike className='mr-1' />
                        <span>Undo Like</span>
                    </button>
                ) : (
                    <button
                        onClick={onLikeEntry}
                        className='flex flex-row items-center hover:text-cyan-600 px-2 py-0.5 tranisiton duration-200 rounded-md'
                    >
                        <BiLike className='mr-1' />
                        <span>Like</span>
                    </button>
                )}
            </div>
        </>
    )
}