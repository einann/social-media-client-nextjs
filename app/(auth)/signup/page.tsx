"use client";

import Link from "next/link"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";

type SignUpInputs = {
    firstName: string;
    lastName: string;
    birthday: string;
    gender: string;
    email: string;
    username: string;
    password: string;
}

export default function SignUp() {
    const { data: session } = useSession();
    const router = useRouter();
    useEffect(() => {
        if (session) {
            router.push("/");
        }
    }, [session, router])

    const data = useRef<SignUpInputs>({
        firstName: "",
        lastName: "",
        birthday: "",
        gender: "",
        email: "",
        username: "",
        password: "",
    });
    const [error, setError] = useState('');

    const onSignUp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const res = await fetch("http://localhost:3001/users", {
            method: "POST",
            body: formData,
        });
        if (!res.ok) {
            res.status == 409 ? setError("A user is already signed up with this username or email.") : setError("An error occured, try again.");
            return;
        }
        const response = await res.json();
        if (response) {
            router.push("/verify");
        }
    }

    return (
        <main className={`flex flex-col items-center justify-center h-screen`}>
            <div className={`flex flex-col p-10 md:w-1/3 w-full border-2 rounded-lg border-cyan-800/10 shadow-lg shadow-slate-600/25 bg-white`}>
                <h2 className="text-center text-3xl text-slate-500 mb-5 pb-2 border-b-2 border-b-slate-100">Sign Up</h2>
                <form className="flex flex-col" onSubmit={onSignUp}>
                    <label className="flex flex-col mb-2">
                        <span className="text-slate-600">First & Last Name</span>
                        <div className="flex">
                            <input
                                name="firstName"
                                required
                                className="border border-cyan-500/25 rounded-md p-0.5 caret-cyan-500 focus:outline-none focus:bg-cyan-50/50 w-1/2 mr-2"
                                onChange={(e) => (data.current.firstName = e.target.value)}
                            />
                            <input
                                name="lastName"
                                required
                                className="border border-cyan-500/25 rounded-md p-0.5 caret-cyan-500 focus:outline-none focus:bg-cyan-50/50 w-1/2"
                                onChange={(e) => (data.current.lastName = e.target.value)}
                            />
                        </div>
                    </label>
                    <label className="flex flex-col mb-2">
                        <span className="text-slate-600">Birthdate / Gender</span>
                        <div className="flex">
                            <input
                                name="birthday"
                                type="date"
                                required
                                className="border border-cyan-500/25 rounded-md p-0.5 caret-cyan-500 focus:outline-none focus:bg-cyan-50/50 w-1/2 mr-2"
                                onChange={(e) => (data.current.birthday = e.target.value)}
                            />
                            <input
                                name="gender"
                                type="string"
                                required
                                className="border border-cyan-500/25 rounded-md p-0.5 caret-cyan-500 focus:outline-none focus:bg-cyan-50/50 w-1/2"
                                onChange={(e) => (data.current.gender = e.target.value)}
                            />
                        </div>
                    </label>
                    <label className="flex flex-col mb-2">
                        <span className="text-slate-600">Email</span>
                        <input
                            name="email"
                            type="email"
                            required
                            className="border border-cyan-500/25 rounded-md p-0.5 caret-cyan-500 focus:outline-none focus:bg-cyan-50/50 invalid:text-pink-500"
                            onChange={(e) => (data.current.email = e.target.value)}
                        />
                    </label>
                    <label className="flex flex-col mb-2">
                        <span className="text-slate-600">Username</span>
                        <input
                            name="username"
                            required
                            className="border border-cyan-500/25 rounded-md p-0.5 caret-cyan-500 focus:outline-none focus:bg-cyan-50/50"
                            onChange={(e) => (data.current.username = e.target.value)}
                        />
                    </label>
                    <label className="flex flex-col mb-5">
                        <span className="text-slate-600">Password</span>
                        <input
                            name="password"
                            type="password"
                            required
                            className="border border-cyan-500/25 rounded-md p-0.5 caret-cyan-500 focus:outline-none focus:bg-cyan-50/50"
                            onChange={(e) => (data.current.password = e.target.value)}
                        />
                    </label>
                    <button className="bg-cyan-600 shadow-lg shadow-cyan-600/50 rounded-md p-1 text-white w-1/2 self-center hover:bg-cyan-700 transition">Sign Up</button>
                    {error && <span className="text-center mt-3 text-pink-600">{error}</span>}
                    <div className="flex justify-between mt-5 text-sm border-t-2 border-t-slate-100 pt-2">
                        <p className="text-slate-500">Already have an account?</p>
                        <Link href="/login" className="text-sky-500 font-bold hover:text-sky-600">Login</Link>
                    </div>
                </form>
            </div>
        </main>
    )
}
