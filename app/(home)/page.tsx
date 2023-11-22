import ShareSomething from "../components/ShareSomething";
import Entry from "../components/Entry/Entry";
import DummyAvatar from '@/public/dummy_avatar.png';
import DummyContentImage from '@/public/dummy_content_image.jpg';
import { transformRequest } from "@/util/transformRequest";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


const allData = [
    {
        entryId: "6yh6ha4ga",
        createdUser: {
            username: "4real",
            profilePicture: DummyAvatar
        },
        createDate: "20231108",
        createTime: "160722",
        contentImage: "",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incentryIdidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
        entryId: "dj4a0ufae",
        createdUser: {
            username: "einan",
            profilePicture: DummyAvatar,
        },
        createDate: "20231104",
        createTime: "112233",
        contentImage: DummyContentImage,
        content: "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. What's happened to me? he thought. It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls.",
    },
    {
        entryId: "7d3b09fec3",
        createDate: "20230806",
        createTime: "221505",
        createdUser: {
            username: "dummydeneme",
            profilePicture: DummyAvatar,
        },
        contentImage: "",
        content: "bu da farklı bir deneme, bakalım ne olacak. bu da farklı bir deneme, bakalım ne olacak. bu da farklı bir deneme, bakalım ne olacak",
    }
]

export default async function Home() {
    const session = await getServerSession(authOptions);
    if (session?.user.verified === "false") {
        redirect("/verify");
    }
    const filter = transformRequest("", "FullDto");
    
    const res = await fetch("http://localhost:3001/entries/get", {
        method: "POST",
        body: JSON.stringify(filter),
        headers: {
            "Authorization": `Bearer ${session?.tokens.access_token}`,
            "Content-Type": "application/json"
        }
    });
    const response = await res.json();

    return (
        <main className="p-2 w-full md:p-5">
            {/* Share Something */}
            <ShareSomething />

            {/* Entries */}
            {allData.map(data => {
                return (
                    <Entry key={data.entryId} data={data} isDetail={false} />
                )
            })}
        </main>
    )
}
