"use client";

import Link from 'next/link';
import { BiLike } from 'react-icons/bi';

export default function LikeButton() {
    return (
        <>
            <div className='flex flex-row items-center text-sm'>
                <button className='mr-0.5 hover:text-emerald-600'>(32)</button>
                <button className='flex flex-row items-center hover:text-cyan-600 px-2 py-0.5 tranisiton duration-200 rounded-md'>
                    <BiLike className='mr-1' />
                    <span>Like</span>
                </button>
            </div>
        </>
    )
}
