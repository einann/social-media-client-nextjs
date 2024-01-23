"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function LoginForm() {
    const [data, setData] = useState({
        username: '',
        password: '',
    })
    const [error, setError] = useState('');
    
    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        const res = await signIn("credentials", {
            username: data.username,
            password: data.password,
            redirect: true,
            callbackUrl: "/verify"
        });
        console.log(res)
        if (res && !res.ok) {
            setError('An error occured. Try again later.');
        }
        if (error) {
            setTimeout(() => {
                setError('')
            }, 1000);
        }
    }
    return (
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
            {error && <span className="text-center mt-3 text-pink-600">{error}</span>}
            <div className="flex justify-between mt-5 text-sm border-t-2 border-t-slate-100 pt-2">
                <p className="text-slate-500">Do not have an account?</p>
                <Link href="/signup" className="text-sky-500 font-bold hover:text-sky-600">Sign up</Link>
            </div>
            <Link href="/forgotpassword" className="mt-1 text-sky-500 text-sm hover:text-sky-600">Forgot password?</Link>
        </form>
    )
}
