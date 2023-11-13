import Link from 'next/link';
import DummyAvatar from '../../../public/dummy_avatar.png';
import Image from 'next/image';
import LikeButton from '../LikeButton';

// DUMMY COMMENT DATA
const comments = [
    {
        "commentId": "1e4477fbb8",
        "content": "ikinci yorum fac ile başlayan parent id'ye",
        "createDate": "20230927",
        "createTime": "221351",
        "createdUser": {
            "username": "tokendanalınacak",
            "firstName": "Tokendan",
            "lastName": "Alınacak",
            "profilePicture": DummyAvatar
        },
        "active": "",
        "parentId": {
            "entryId": "fac392e5f3",
            "content": "yenicontent",
            "createDate": "20230806",
            "createTime": "221407",
            "createdUser": "4real",
            "active": "true",
            "contentImage": "C:\\ei_socm\\entry_images\\88cfe5b1f9_1691349247034.jpg"
        },
        "likes": []
    },
    {
        "commentId": "7265e6400d",
        "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus corporis accusamus optio nesciunt, sequi molestias, odio rerum eius magnam illo harum, tenetur aperiam vero. Recusandae aliquam provident quisquam praesentium ea.",
        "createDate": "20231020",
        "createTime": "185940",
        "createdUser": {
            "username": "einan",
            "firstName": "Ebubekir",
            "lastName": "İnan",
            "profilePicture": DummyAvatar
        },
        "active": "true",
        "parentId": {
            "entryId": "7d3b09fec3",
            "content": "bu da farklı bir deneme, bakalım ne olacak.",
            "createDate": "20230806",
            "createTime": "221505",
            "createdUser": "einan",
            "active": "true",
            "contentImage": ""
        },
        "likes": []
    },
    {
        "commentId": "acb3bd01f5",
        "content": "7d ile başlayan entry yorumu - 1",
        "createDate": "20230927",
        "createTime": "223807",
        "createdUser": {
            "username": "tokendanalınacak",
            "firstName": "Tokendan",
            "lastName": "Alınacak",
            "profilePicture": DummyAvatar
        },
        "active": "",
        "parentId": {
            "entryId": "7d3b09fec3",
            "content": "bu da farklı bir deneme, bakalım ne olacak.",
            "createDate": "20230806",
            "createTime": "221505",
            "createdUser": "einan",
            "active": "true",
            "contentImage": ""
        },
        "likes": []
    },
    {
        "commentId": "bf9d3f8b65",
        "content": "yorumyorum",
        "createDate": "20230927",
        "createTime": "221229",
        "createdUser": {
            "username": "einan",
            "firstName": "Ebubekir",
            "lastName": "İnan",
            "profilePicture": DummyAvatar
        },
        "active": "false",
        "parentId": {
            "entryId": "fac392e5f3",
            "content": "yenicontent",
            "createDate": "20230806",
            "createTime": "221407",
            "createdUser": "4real",
            "active": "true",
            "contentImage": "C:\\ei_socm\\entry_images\\88cfe5b1f9_1691349247034.jpg"
        },
        "likes": []
    },
    {
        "commentId": "de6ffed420",
        "content": "parent'i einan olacak ama kendisi 4real olacak",
        "createDate": "20231020",
        "createTime": "191020",
        "createdUser": {
            "username": "4real",
            "firstName": "For",
            "lastName": "Real",
            "profilePicture": DummyAvatar
        },
        "active": "false",
        "parentId": {
            "entryId": "d7c80b6175",
            "content": "bilmemne",
            "createDate": "20231020",
            "createTime": "183313",
            "createdUser": "4real",
            "active": "true",
            "contentImage": ""
        },
        "likes": [
            {
                "id": 24,
                "createDate": "20231020",
                "createTime": "205012",
                "user": {
                    "username": "einan",
                    "authLevel": "user",
                    "firstName": "ebubekir",
                    "lastName": "inan",
                    "profilePicture": "C:\\ei_socm\\profile_pictures\\afcf43c4b3_1696609695597.jpg",
                    "gender": "male"
                }
            }
        ]
    }
];


export default function Comment({ parentEntryId }: any) {
    return (
        <main className='mt-5 px-5'>
            {comments.map(comment => {
                return (
                    <div key={comment.commentId} className='flex flex-row p-2 border border-cyan-700/20 mb-1 bg-white rounded-md'>
                        <Link href={`/${comment.createdUser.username}`}>
                            <Image
                                src={DummyAvatar}
                                alt="PP"
                                width={30}
                                height={30}
                                className='rounded-full mr-2'
                            />
                        </Link>
                        <div className='w-full'>
                            <div className='flex flex-row justify-between w-full'>
                                <Link href={`/${comment.createdUser.username}`} className='hover:underline'>
                                    <div className='text-xs flex flex-col md:flex-row md:text-sm'>
                                        <div>
                                            <span className='mr-1 text-cyan-700 font-bold'>{comment.createdUser.firstName}</span>
                                            <span className='mr-1 text-cyan-700 font-bold'>{comment.createdUser.lastName}</span>
                                        </div>
                                        <span className='text-slate-400'>({comment.createdUser.username})</span>
                                    </div>
                                </Link>
                                <div className='text-xs text-slate-600'>
                                    3 days ago
                                </div>
                            </div>
                            <div className='text-slate-700 py-1 text-sm'>
                                {comment.content}
                            </div>
                            <LikeButton />
                        </div>
                    </div>
                )
            })}
        </main>
    )
}


// üstte yorum yapma seçeneği olacak.

// 10 adet comment alacak ilk başta, sonrasında view more ile görüntülenecek veya scroll ile.

// yorum beğenilerini ve entry beğenilerini görme olacak.

// MODAL TEKRAR DENENECEK