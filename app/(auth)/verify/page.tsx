import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { BiInfoCircle } from "react-icons/bi";

export default async function VerifyEmail() {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/login");
    else if (session.user.verified === "true") redirect("/");
    
    return (
        <main className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col p-10 md:w-1/3 w-full border-2 rounded-lg border-cyan-800/10 shadow-lg shadow-slate-600/25 bg-white">
                <div className="flex items-center gap-5">
                    <BiInfoCircle className="text-5xl text-sky-600" />
                    <span>An e-mail was sent to your adress -dinamikadres-. Please click the link on your email to verify your account.</span>
                </div>
            </div>
        </main>
    )
}
