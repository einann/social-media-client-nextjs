"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ChangePassword() {
    const { data: session } = useSession();
    const router = useRouter();
    useEffect(() => {
        if (session) {
            router.push("/");
        }
    }, [session, router])
    return (
        <main className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col p-10 md:w-1/3 w-full border-2 rounded-lg border-cyan-800/10 shadow-lg shadow-slate-600/25 bg-white">
                <h2 className="text-center text-3xl text-slate-500 mb-5 pb-2 border-b-2 border-b-slate-100">Change Password</h2>
                <form className="flex flex-col">
                    <label className="flex flex-col mb-2">
                        <span className="text-slate-600">Old Password</span>
                        <input
                            type="password"
                            required
                            className="border border-cyan-500/25 rounded-md p-0.5 caret-cyan-500 focus:outline-none focus:bg-cyan-50/50"
                        />
                    </label>
                    <label className="flex flex-col mb-2">
                        <span className="text-slate-600">New Password</span>
                        <input
                            type="password"
                            required
                            className="border border-cyan-500/25 rounded-md p-0.5 caret-cyan-500 focus:outline-none focus:bg-cyan-50/50"
                        />
                    </label>
                    <label className="flex flex-col mb-5">
                        <span className="text-slate-600">New Password Repeat</span>
                        <input
                            type="password"
                            required
                            className="border border-cyan-500/25 rounded-md p-0.5 caret-cyan-500 focus:outline-none focus:bg-cyan-50/50"
                        />
                    </label>
                    <button className="bg-cyan-600 shadow-lg shadow-cyan-600/50 rounded-md p-1 text-white w-1/2 self-center hover:bg-cyan-700 transition">Change</button>
                    <Link href="/login" className="mt-1 text-sky-500 text-sm font-bold hover:text-sky-600">Login</Link>
                </form>
            </div>
        </main>
    )
}
