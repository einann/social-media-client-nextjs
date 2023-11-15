"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Login() {
    const router = useRouter();
    const [data, setData] = useState({
        username: '',
        password: '',
    })
    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        const rawres = await fetch('http://localhost:3001/auth', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: data.username,
                password: data.password
            }),
        });
        const res = await rawres.json();
        console.log(res)
        if (res) {
            router.push("/")
        }
    }
    return (
        <main className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col p-10 md:w-1/3 w-full border-2 rounded-lg border-cyan-800/10 shadow-lg shadow-slate-600/25 bg-white">
                <h2 className="text-center text-3xl text-slate-500 mb-5 pb-2 border-b-2 border-b-slate-100">Login</h2>
                <form className="flex flex-col" onSubmit={handleLogin}>
                    <label className="flex flex-col mb-2">
                        <span className="text-slate-600">Username</span>
                        <input
                            required
                            className="border border-cyan-500/25 rounded-md p-0.5 caret-cyan-500 focus:outline-none focus:bg-cyan-50/50"
                            value={data.username}
                            onChange={(e) => setData({ ...data, username: e.target.value })}
                        />
                    </label>
                    <label className="flex flex-col mb-5">
                        <span className="text-slate-600">Password</span>
                        <input
                            type="password"
                            required
                            className="border border-cyan-500/25 rounded-md p-0.5 caret-cyan-500 focus:outline-none focus:bg-cyan-50/50"
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                        />
                    </label>
                    <button className="bg-cyan-600 shadow-lg shadow-cyan-600/50 rounded-md p-1 text-white w-1/2 self-center hover:bg-cyan-700 transition">Login</button>
                    <div className="flex justify-between mt-5 text-sm border-t-2 border-t-slate-100 pt-2">
                        <p className="text-slate-500">Do not have an account?</p>
                        <Link href="/signup" className="text-sky-500 font-bold hover:text-sky-600">Sign up</Link>
                    </div>
                    <Link href="/forgotpassword" className="mt-1 text-sky-500 text-sm hover:text-sky-600">Forgot password?</Link>
                </form>
            </div>
        </main>
    )
}
