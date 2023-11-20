"use client";

import { BiSolidSend } from "react-icons/bi";

export default function CommentSomething() {
    return (
        <form className="flex flex-row gap-3 w-full p-3 bg-slate-100 rounded-md">
            <input type='text' placeholder='Comment something...' className='w-full border p-2 text-sm text-cyan-600 placeholder-cyan-600 rounded-md border-cyan-500/25 caret-cyan-500 focus:outline-none focus:bg-cyan-50/50'></input>
            <button className="bg-cyan-600 shadow-lg shadow-cyan-600/50 rounded-md px-5 py-2 text-white self-center hover:bg-cyan-700 transition"><BiSolidSend /></button>
        </form>
    )
}
