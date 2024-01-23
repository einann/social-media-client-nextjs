import { getServerSession } from "next-auth";
import SignUpForm from "./SignUpForm";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function SignUp() {
    const session = await getServerSession(authOptions);
    if (session) {
        redirect("/");
    }
    return (
        <main className={`flex flex-col items-center justify-center h-screen`}>
            <div className={`flex flex-col p-10 md:w-1/3 w-full border-2 rounded-lg border-cyan-800/10 shadow-lg shadow-slate-600/25 bg-white`}>
                <h2 className="text-center text-3xl text-slate-500 mb-5 pb-2 border-b-2 border-b-slate-100">Sign Up</h2>
                <SignUpForm />
            </div>
        </main>
    )
}
