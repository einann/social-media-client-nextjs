import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { BiCheck } from "react-icons/bi";
import CustomLogout from "@/app/components/CustomLogout";

export default async function Verified() {
    const session = await getServerSession(authOptions);
    if (session && session.user) {
        if (session.user.verified === "true") {
            redirect("/");
        }
        else {
            const res = await fetch(`http://localhost:3001/users/${session.user.username}`, {
                headers: {
                    "Authorization": `Bearer ${session.tokens.access_token}`,
                    "Content-Type": "application/json"
                }
            });
            if (!res.ok) {
                redirect("/verify");
            }
            const response = await res.json();
            // If both are false, redirect to /verify. 
            // If db value is true but session is false, this page will be rendered and user should manually logout then login.
            if (response.verified !== "true") {
                redirect("/verify");
            }
        }
    }
    else {
        redirect("/login");
    }
    return (
        <main className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col p-10 md:w-1/3 w-full border-2 rounded-lg border-cyan-800/10 shadow-lg shadow-slate-600/25 bg-white">
                <div className="flex items-center gap-5 mb-5">
                    <BiCheck className="text-5xl text-emerald-600" />
                    <span className="pointer-events-none">Your account is successfully approved. You can now log in.</span>
                </div>
                <div className="flex justify-center">
                    <CustomLogout text="Login" />
                </div>
            </div>
        </main>
    )
}
