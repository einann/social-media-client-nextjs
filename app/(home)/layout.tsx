import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Navbar from "../components/Navbar";
import { redirect } from "next/navigation";

type LayoutProps = {
    children?: React.ReactNode,
    modal: React.ReactNode
};

export default async function HomeLayout({ children, modal }: LayoutProps) {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/login");
    }
    else if (session?.user.verified === "false") {
        redirect("/verify");
    }
    return (
        <main className="w-full flex flex-col">
            <div className="w-full md:w-1/2 border self-center bg-white">
                <Navbar />
                <div className="flex flex-col md:flex-row">
                    {children}
                    {modal}
                </div>
            </div>
        </main>
    )
}