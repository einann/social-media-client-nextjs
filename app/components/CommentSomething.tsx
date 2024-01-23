"use client";

import { FormEvent, useState } from "react";
import { BiSolidSend } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function CommentSomething({ parentId }: { parentId: string }) {
    const [isLoading, setLoading] = useState(false);

    const onShareComment = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        
        const formData = new FormData(e.currentTarget);
        const comment = formData.get("comment");
        
        
    }

    return (
        <form className="flex flex-row gap-3 w-full p-3 bg-slate-100 rounded-md" onSubmit={onShareComment}>
            <input name="comment" type='text' placeholder='Comment something...' className='w-full border p-2 text-sm text-cyan-600 placeholder-cyan-600 rounded-md border-cyan-500/25 caret-cyan-500 focus:outline-none focus:bg-cyan-50/50'></input>
            <button
                disabled={isLoading}
                className="bg-cyan-600 shadow-lg shadow-cyan-600/50 rounded-md px-5 py-2 text-white self-center hover:bg-cyan-700 transition disabled:bg-cyan-600/50 disabled:pointer-events-none"
            >
                {isLoading ? <AiOutlineLoading3Quarters className="animate-spin" /> : <BiSolidSend />}
            </button>
        </form>
    )
}
