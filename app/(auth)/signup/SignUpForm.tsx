"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";

type SignUpInputs = {
    firstName: string;
    lastName: string;
    birthday: string;
    gender: string;
    email: string;
    username: string;
    password: string;
}

export default function SignUpForm() {
    const router = useRouter();
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
    const [isLoading, setLoading] = useState(false);

    const onSignUp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const res = await fetch("http://localhost:3001/users", {
            method: "POST",
            body: formData,
        });
        if (!res.ok) {
            res.status == 409 ? setError("A user is already signed up with this username or email.") : setError("An error occured, try again.");
            setLoading(false);
            return;
        }
        const response = await res.json();
        console.log(response)
        if (response) {
            setLoading(false);
            router.push("/verify");
        }
    }

    return (
        <form className="flex flex-col" onSubmit={onSignUp}>
            <label className="flex flex-col mb-2">
                <span className="text-slate-600">First / Last Name</span>
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
                    <select
                        name="gender"
                        className="border border-cyan-500/25 rounded-md p-0.5 w-1/2 focus:bg-cyan-50/50 focus:outline-none"
                        onChange={(e) => (data.current.gender = e.target.value)}
                    >
                        <option>Male</option>
                        <option>Female</option>
                    </select>
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

            <button
                disabled={isLoading}
                className="bg-cyan-600 shadow-lg shadow-cyan-600/50 rounded-md p-1 text-white w-1/2 self-center hover:bg-cyan-700 transition disabled:bg-cyan-600/50 disabled:pointer-events-none disabled:cursor-not-allowed"
            >
                {isLoading ? 'Processing...' : 'Sign Up'}
            </button>
            {error && <span className="text-center mt-3 text-pink-600">{error}</span>}
            <div className="flex justify-between mt-5 text-sm border-t-2 border-t-slate-100 pt-2">
                <p className="text-slate-500">Already have an account?</p>
                <Link href="/login" className="text-sky-500 font-bold hover:text-sky-600">Login</Link>
            </div>
        </form>
    )
}
