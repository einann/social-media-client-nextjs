"use client";

import Link from "next/link";
import { signOut } from "next-auth/react"
import { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";

export default function Verified() {
    const [error, setError] = useState(true);
    useEffect(() => {
        signOut({ redirect: false }).then(() => {
            setError(false);
        });
    }, []);

    return (
        <main className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col p-10 md:w-1/3 w-full border-2 rounded-lg border-cyan-800/10 shadow-lg shadow-slate-600/25 bg-white">
                {!error &&
                    <>
                        <div className="flex items-center gap-5">
                            <BiCheck className="text-5xl text-emerald-600" />
                            <span className="pointer-events-none">Your account is successfully approved. You can now log in.</span>
                        </div>
                        <div className="flex justify-center">
                            <Link href="/login" className="text-sky-500 font-bold hover:text-sky-600">Login</Link>
                        </div>
                    </>
                }
                {error && <div>An error occured.</div>}
            </div>
        </main>
    )
}
