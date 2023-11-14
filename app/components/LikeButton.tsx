"use client";

import Link from 'next/link';
import { BiLike } from 'react-icons/bi';

/**
 * 
 * @param type -> entry or comment
 * @param id -> entryId or commentId
 */
export default function LikeButton({ type, id, parentId, isDetail }: any) {
    const sourceEntryId = type == "entry" ? id : parentId;
    return (
        <>
            <div className='flex flex-row items-center text-sm'>
                {isDetail && <Link href={`/entry/${sourceEntryId}/?modal=true&type=${type}&id=${id}`} className='mr-0.5 text-slate-400 hover:text-emerald-600'>32</Link>}
                {!isDetail && <div className='mr-0.5 text-slate-700'>32</div>}
                <button className='flex flex-row items-center hover:text-cyan-600 px-2 py-0.5 tranisiton duration-200 rounded-md'>
                    <BiLike className='mr-1' />
                    <span>Like</span>
                </button>
            </div>
        </>
    )
}
