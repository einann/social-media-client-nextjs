import FollowerList from "../Components/FollowerList"

export default function Followers({ params }: { params: { username: string } }) {
    return (
        <div className="w-full">
            <h1 className="text-lg font-bold text-center text-slate-600 border-b">Accounts which follow {params.username}</h1>
            <FollowerList username={params.username} />
        </div>
    )
}
