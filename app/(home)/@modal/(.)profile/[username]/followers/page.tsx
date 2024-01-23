import FollowerList from "@/app/(home)/profile/[username]/Components/FollowerList"
import Modal from "@/app/components/Modal"

export default async function Followers({ params }: { params: { username: string } }) {
    return (
        <Modal>
            <main className='bg-slate-300 rounded-md'>
                {/* header and close button */}
                <div className="flex justify-between items-center border-b bg-slate-400 rounded-md">
                    <span className="ml-2 font-bold cursor-default p-2">FOLLOWERS</span>
                </div>

                {/* user content - picture, first and last names, username and follow buttons */}
                <FollowerList username={params.username} />

            </main>
        </Modal>
    )
}
