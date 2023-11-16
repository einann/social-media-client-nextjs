"use client";

import Link from 'next/link';
import { BiLike } from 'react-icons/bi';

export default function LikeButton({ id, isDetail }: any) {
    console.log(id, isDetail)
    return (
        <>
            <div className='flex flex-row items-center text-sm'>
                {isDetail && <Link href={`/entry/${id}/likes`} className='mr-0.5 text-slate-400 hover:text-emerald-600'>32</Link>}
                {!isDetail && <div className='mr-0.5 text-slate-700'>32</div>}
                <button className='flex flex-row items-center hover:text-cyan-600 px-2 py-0.5 tranisiton duration-200 rounded-md'>
                    <BiLike className='mr-1' />
                    <span>Like</span>
                </button>
            </div>
        </>
    )
}


// comments'te farklı bir url'ye gitmesi gerekebilir.

// Component'te sayıyı göstermeye ihtiyaç kalmayabilir, beğeni sayısı Entry ve Comment'in içine alınabilir,
// Sadece beğenme butonu component olarak kalabilir
// O durumda servisten dönen yanıta göre beğeni artırma işlemi nasıl olacak