import DummyAvatar from '../../../public/dummy_avatar.png';
import Image from 'next/image';

const data = [
    {
        id: "6yh6ha4ga",
        createdUser: {
            username: "4real",
            profilePicture: DummyAvatar
        },
        createDate: "20231108",
        createTime: "160722",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
        id: "dj4a0ufae",
        createdUser: {
            username: "einan",
            profilePicture: DummyAvatar,
        },
        createDate: "20231104",
        createTime: "112233",
        content: "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. What's happened to me? he thought. It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls.",
    }
]

const singleData = data[0];

export default function Entry() {
    return (
        <main className="w-full bg-slate-100 p-2 rounded-md">
            {/* User Info and Date Info */}
            <div className='flex flex-row justify-between border-b pb-2'>
                <div className='flex flex-row items-center gap-3'>
                    <Image
                        src={singleData.createdUser.profilePicture}
                        alt="PP"
                        width={30}
                        height={30}
                        className='rounded-full'
                    />
                    <span>{singleData.createdUser.username}</span>
                </div>
                <div className='flex flex-row gap-2 items-center text-sm text-slate-600'>
                    <span className='font-bold'>{singleData.createDate}</span>
                    <span>{singleData.createTime}</span>
                </div>
            </div>

            {/* Content */}
            <div className='p-4 text-slate-600'>
                <span>{singleData.content}</span>
            </div>

            {/* Like and Comment Buttons */}
        </main>
    )
}
