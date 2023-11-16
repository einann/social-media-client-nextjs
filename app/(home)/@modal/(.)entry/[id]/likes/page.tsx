import Modal from '@/app/components/Modal'
import React from 'react'

import DummyAvatar from '@/public/dummy_avatar.png';
import Image from "next/image";
import Link from 'next/link';
import { MdOutlineClose } from 'react-icons/md';

const likes = [
    {
        "id": 24,
        "createDate": "20231020",
        "createTime": "205012",
        "user": {
            "username": "einan",
            "authLevel": "user",
            "firstName": "ebubekir",
            "lastName": "inan",
            "profilePicture": DummyAvatar,
            "gender": "male"
        }
    },
    {
        "id": 1,
        "createDate": "20231021",
        "createTime": "201112",
        "user": {
            "username": "4real",
            "authLevel": "user",
            "firstName": "For",
            "lastName": "Real",
            "profilePicture": DummyAvatar,
            "gender": "female"
        }
    },
    {
        "id": 2,
        "createDate": "20230101",
        "createTime": "001122",
        "user": {
            "username": "dummydeneme",
            "authLevel": "user",
            "firstName": "Dummy",
            "lastName": "Deneme",
            "profilePicture": DummyAvatar,
            "gender": "male"
        }
    },
    {
        "id": 75,
        "createDate": "20230101",
        "createTime": "001122",
        "user": {
            "username": "allforone",
            "authLevel": "user",
            "firstName": "All For",
            "lastName": "One",
            "profilePicture": DummyAvatar,
            "gender": "male"
        }
    },
]

export default function Likes({ params: { id: entryId } }: { params: { id: string } } ) {
    // entryId ile istek atılacak. Comment nasıl anlaşılacak?
    return (
        <Modal>
            <main className='bg-slate-300 rounded-md'>
                {/* header and close button */}
                <div className="flex justify-between items-center border-b bg-slate-400 rounded-md">
                    <span className="ml-2 font-bold cursor-default p-2">LIKES</span>
                </div>

                {/* user content - picture, first and last names, username */}
                <div className="flex flex-col gap-1 p-2 overflow-y-auto">
                    {likes.map(like => {
                        return (
                            <div key={like.id} className="w-full border p-2 flex items-center bg-slate-200 rounded-md">
                                <Link href={`/${like.user.username}`} className="mr-2">
                                    <Image
                                        src={DummyAvatar}
                                        alt="PP"
                                        width={30}
                                        height={30}
                                        className="rounded-full"
                                    />
                                </Link>
                                <div className="flex flex-col">
                                    <span className="font-semibold hover:underline"><Link href={`/${like.user.username}`}>{like.user.firstName} {like.user.lastName}</Link></span>
                                    <span className="text-sm text-slate-500 cursor-default">{like.user.username}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </main>
        </Modal>
    )
}
