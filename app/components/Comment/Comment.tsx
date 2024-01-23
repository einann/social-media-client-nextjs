import Link from 'next/link';
import DummyAvatar from '@/public/dummy_avatar.png';
import Image from 'next/image';
import LikeButton from '../LikeButton';
import { transformRequest } from '@/util/transformRequest';
import { globalFetch_server } from '@/util/globalFetch_server';
import { CommentType } from '@/lib/comment.type';
import { UserType } from '@/lib/user.type';
import { genericDateFormat, genericTimeFormat } from '@/util/util';

export default async function Comment({ parentId }: { parentId: string }) {
    const filter = transformRequest(`parentId==${parentId}`, 'FullDto');
    const comments: CommentType[] = await globalFetch_server('comments/get', 'POST', filter);

    const usernames = [...new Set(comments.map(comment => comment.createdUser))].join(",");
    const userFilter = transformRequest(`username==${usernames}`);
    const users: UserType[] = await globalFetch_server("users/get", "POST", userFilter);
    if (users && users.length) {
        comments.forEach(comment => {
            comment.createDate_parsed = genericDateFormat(comment.createDate, "DD MMM YYYY");
            comment.createTime_parsed = genericTimeFormat(comment.createTime);
            const userOfEntry = users.find(user => user.username === comment.createdUser);
            if (userOfEntry) comment.createdUser = userOfEntry;
        });
    }

    return (
        <main className='mt-5 px-5'>
            {(!comments || !comments.length) && <h1 className='text-center'>No comments yet.</h1>}
            {comments.map(comment => {
                return (
                    <div key={comment.commentId} className='flex flex-row p-2 mb-1 bg-slate-200/50 rounded-md'>
                        <Link href={`/profile/${comment.createdUser.username}`}>
                            <Image
                                src={comment.createdUser.profilePicture}
                                alt="PP"
                                width={30}
                                height={30}
                                className='rounded-full mr-2'
                            />
                        </Link>
                        <div className='w-full cursor-default'>
                            <div className='flex flex-row justify-between w-full'>
                                <Link href={`/profile/${comment.createdUser.username}`} className='hover:underline'>
                                    <div className='text-xs flex flex-col md:flex-row md:text-sm'>
                                        <div>
                                            <span className='mr-1 text-cyan-700 font-bold'>{comment.createdUser.firstName}</span>
                                            <span className='mr-1 text-cyan-700 font-bold'>{comment.createdUser.lastName}</span>
                                        </div>
                                        <span className='text-slate-400'>({comment.createdUser.username})</span>
                                    </div>
                                </Link>
                                <div className='text-xs text-slate-600 flex gap-2'>
                                    <span className='font-bold'>
                                        {comment.createDate_parsed}
                                    </span>
                                    <span>
                                        {comment.createTime_parsed}
                                    </span>
                                </div>
                            </div>
                            <div className='text-slate-700 py-1 text-sm'>
                                {comment.content}
                            </div>
                            <LikeButton source='comment' likes={comment.likes} id={comment.commentId} isDetail={true} />
                        </div>
                    </div>
                )
            })}
        </main>
    )
}


// 10 adet comment alacak ilk başta, sonrasında view more ile görüntülenecek veya scroll ile.