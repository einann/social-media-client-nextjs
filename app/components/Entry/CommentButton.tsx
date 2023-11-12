"use client";

import { BiComment } from "react-icons/bi";

export default function CommentButton() {
    return (
        <div className='flex flex-row items-center'>
            <button className='mr-0.5 hover:text-emerald-600'>(14)</button>
            <button className='flex flex-row items-center hover:text-cyan-600 px-2 py-0.5 tranisiton duration-200 rounded-md'>
                <BiComment className='mr-1' />
                <span>Comment</span>
            </button>
        </div>
    )
}
