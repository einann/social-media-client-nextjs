"use client";

import ModalNonRouter from "@/app/components/ModalNonRouter";
import Link from "next/link";
import { useState, FormEvent } from "react";
import { BiCheck, BiErrorCircle } from "react-icons/bi";

export default function PasswordResetForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [info, setInfo] = useState({
        error: false,
        isDialogOpen: false,
        message: "",
    });
    const onSendResetMail = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const res = await fetch("http://localhost:3001/users/forgotpassword", {
            method: "POST",
            body: JSON.stringify({ email }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (res.ok) {
            setInfo({ error: false, isDialogOpen: true, message: "Mail sent successfully." });
        }
        else {
            setInfo({ error: true, isDialogOpen: true, message: "An error occured, try again later." });
        }
        setIsLoading(false);
    }
    return (
        <>
            <form className="flex flex-col" onSubmit={onSendResetMail}>
                <label className="flex flex-col mb-2">
                    <span className="text-slate-600">Email</span>
                    <input
                        name="email"
                        type="email"
                        required
                        className="border border-cyan-500/25 rounded-md p-0.5 caret-cyan-500 focus:outline-none focus:bg-cyan-50/50"
                    />
                </label>
                <button
                    disabled={isLoading}
                    className="bg-cyan-600 shadow-lg shadow-cyan-600/50 rounded-md p-1 text-white w-1/3 self-center hover:bg-cyan-700 transition disabled:bg-cyan-300"
                >
                    {isLoading ? 'Processing...' : 'Send Link'}

                </button>
                <div className="flex justify-between mt-5 text-sm border-t-2 border-t-slate-100 pt-2">
                    <Link href="/login" className="mt-1 text-sky-500 font-bold hover:text-sky-600">Login</Link>
                    <Link href="/signup" className="mt-1 text-sky-500 font-bold hover:text-sky-600">Sign up</Link>
                </div>
            </form>

            {info.isDialogOpen &&
                <ModalNonRouter isOpen={info.isDialogOpen} close={() => setInfo({ error: false, message: "", isDialogOpen: false })}>
                    <div className="flex items-center gap-5">
                        <span className={`text-2xl ${info.error ? 'text-pink-700' : 'text-teal-700'} `}>{info.error ? <BiErrorCircle /> : <BiCheck />}</span>
                        <span>{info.message}</span>
                    </div>
                </ModalNonRouter>
            }
        </>
    )
}
