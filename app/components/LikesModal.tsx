import Link from "next/link";
import { MdOutlineClose } from "react-icons/md";
import DummyAvatar from '@/public/dummy_avatar.png';
import Image from "next/image";

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

// type ve id istek atarken kullanılacak.

export default function LikesModal({ type, id, entryId }: any) {
    return (
        <main className='fixed w-full md:w-1/3 h-1/2 rounded-md bg-slate-300 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col shadow-lg'>
            {/* header and close button */}
            <div className="flex justify-between items-center border-b bg-slate-400 rounded-md">
                <span className="ml-2 font-bold cursor-default">LIKES</span>
                <Link href={`/entry/${entryId}`} className="flex items-center p-2 gap-1 hover:bg-slate-500/50">
                    <MdOutlineClose />
                    <span>Close</span>
                </Link>
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
    )
}
