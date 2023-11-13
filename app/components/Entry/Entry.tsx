import Image from 'next/image';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import Link from 'next/link';

interface EntryInterface {
    entryId: string;
    content: string;
    createDate: string;
    createTime: string;
    createdUser: {
        username: string;
        profilePicture: string;
    };
    // active: string;
    contentImage: string;
    // likes: [];
}

// data için interface oluşturulacak
export default function Entry({ data, isDetail }: any) {
    return (
        <main className="w-full bg-slate-100 p-2 rounded-md mb-3">
            {/* User Info and Date Info */}
            <div className='flex flex-row justify-between border-b pb-2'>
                <Link href={`/user/${data.createdUser.username}`}>
                    <div className='flex flex-row items-center gap-3 hover:bg-slate-200 transition duration-200 px-2'>
                        <Image
                            src={data.createdUser.profilePicture}
                            alt="PP"
                            width={30}
                            height={30}
                            className='rounded-full'
                        />
                        <span>{data.createdUser.username}</span>
                    </div>
                </Link>
                <div className='flex flex-row gap-2 items-center text-sm text-slate-600'>
                    <span className='font-bold'>{data.createDate}</span>
                    <span>{data.createTime}</span>
                </div>
            </div>

            {/* Content */}
            <div className='text-slate border-b'>
                {isDetail ? <TextContent data={data} /> : <LinkContent data={data} />}
                {data.contentImage && (
                    <div className='flex flex-row justify-center p-4'>
                        <Image
                            src={data.contentImage}
                            alt="contentImage"
                        />
                    </div>
                )}

            </div>

            {/* Like and Comment Buttons */}
            <div className='flex flex-row gap-10 pt-2'>
                <LikeButton />
                <CommentButton />
            </div>
        </main>
    )
}

const LinkContent = ({ data }: any) => {
    return (
        <Link href={`/entry/${data.entryId}`}>
            <div className='hover:bg-slate-200 transition duration-200 p-4'>
                <span>{data.content}</span>
            </div>
        </Link>
    )
}

const TextContent = ({ data }: any) => {
    return (
        <div className='p-4'>
            <span>{data.content}</span>
        </div>
    )
}