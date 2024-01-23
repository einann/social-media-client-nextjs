import FollowingList from "../Components/FollowingList";

export default function Following({ params }: { params: { username: string } }) {
    return (
        <div className="w-full">
            <h1 className="text-lg font-bold text-center text-slate-600 border-b">Accounts followed by {params.username}</h1>
            <FollowingList username={params.username} />
        </div>
    )
}
