import Modal from "@/app/components/Modal"
import FollowingList from "@/app/(home)/profile/[username]/Components/FollowingList";

export default async function Following({ params }: { params: { username: string } }) {
    return (
        <Modal>
            <main className='bg-slate-300 rounded-md'>
                {/* header and close button */}
                <div className="flex justify-between items-center border-b bg-slate-400 rounded-md">
                    <span className="ml-2 font-bold cursor-default p-2">FOLLOWING</span>
                </div>

                {/* user content - picture, first and last names, username and follow buttons */}
                <FollowingList username={params.username} />

            </main>
        </Modal>
    )
}
