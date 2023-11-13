import Entry from '@/app/components/Entry/Entry'
import React from 'react'
import DummyAvatar from '../../../../public/dummy_avatar.png';

const data = {
    entryId: "6yh6ha4ga",
    createdUser: {
        username: "4real",
        profilePicture: DummyAvatar
    },
    createDate: "20231108",
    createTime: "160722",
    contentImage: "",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incentryIdidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
};

export default function EntryDetail() {
    return (
        <main className='p-2 mt-2'>
            <Entry data={data} isDetail={true} />
        </main>
    )
}
