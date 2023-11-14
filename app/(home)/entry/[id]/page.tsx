import Entry from '@/app/components/Entry/Entry'
import React from 'react'
import DummyAvatar from '@/public/dummy_avatar.png';
import Comment from '@/app/components/Comment/Comment';
import CommentSomething from '@/app/components/CommentSomething';
import LikesModal from '@/app/components/LikesModal';

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

type Props = {
    searchParams: Record<string, string> | null | undefined
};

export default function EntryDetail({ searchParams }: Props) {
    const [modal, type, id] = [searchParams?.modal, searchParams?.type, searchParams?.id];
    return (
        <>
            <main className={`p-2 mt-2 flex flex-col ${modal && 'opacity-25 pointer-events-none select-none'}`}>
                <Entry data={data} isDetail={true} />
                <CommentSomething />
                <Comment parentId={data.entryId} />
            </main>

            {modal && <LikesModal type={type} id={id} entryId={data.entryId} />}
        </>
    )
}
