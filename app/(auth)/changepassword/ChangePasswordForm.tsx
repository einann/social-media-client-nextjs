"use client";

import ModalNonRouter from "@/app/components/ModalNonRouter";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { BiErrorCircle, BiCheck } from "react-icons/bi";

export default function ChangePasswordForm({ token }: { token: string }) {
    const initial = { error: false, message: '', isDialogOpen: false };
    const [info, setInfo] = useState(initial)
    const onSubmitChangePassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setInfo(initial);
        const formData = new FormData(e.currentTarget);
        const password = formData.get("password");
        const passwordRepeat = formData.get("passwordRepeat");

        if (password !== passwordRepeat) {
            return setInfo({ error: true, message: 'Passwords do not match.', isDialogOpen: true });
        }
        else if (password && password?.toString().length < 6) {
            return setInfo({ error: true, message: 'Password must be at least 6 characters length.', isDialogOpen: true });
        }

        const res = await fetch(`http://localhost:3001/users/resetpassword/${token}`, {
            method: "POST",
            body: formData,
        });

        if (!res.ok) {
            setInfo({ error: true, message: "An error occured, try again later.", isDialogOpen: true });
        }
        else {
            setInfo({ error: false, message: "Password changed successfully. You may now login.", isDialogOpen: true });
        }

    }
    return (
        <>
            <form className="flex flex-col" onSubmit={onSubmitChangePassword}>
                <label className="flex flex-col mb-2">
                    <span className="text-slate-600">New Password</span>
                    <input
                        name="password"
                        type="password"
                        required
                        className="border border-cyan-500/25 rounded-md p-0.5 caret-cyan-500 focus:outline-none focus:bg-cyan-50/50"
                    />
                </label>
                <label className="flex flex-col mb-5">
                    <span className="text-slate-600">New Password Repeat</span>
                    <input
                        name="passwordRepeat"
                        type="password"
                        required
                        className="border border-cyan-500/25 rounded-md p-0.5 caret-cyan-500 focus:outline-none focus:bg-cyan-50/50"
                    />
                </label>
                <button className="bg-cyan-600 shadow-lg shadow-cyan-600/50 rounded-md p-1 text-white w-1/2 self-center hover:bg-cyan-700 transition">Change</button>
                <div className="flex justify-between">
                    <Link href="/login" className="mt-1 text-sky-500 text-sm font-bold hover:text-sky-600">Login</Link>
                    <Link href="/forgotpassword" className="mt-1 text-sky-500 text-sm font-bold hover:text-sky-600">Resend Link</Link>
                </div>
            </form>

            {info.isDialogOpen &&
                <ModalNonRouter isOpen={info.isDialogOpen} close={() => setInfo({ error: false, message: "", isDialogOpen: false })}>
                    <div className="flex items-center gap-5">
                        <span className={`text-2xl ${info.error ? 'text-pink-700' : 'text-teal-700'} `}>{info.error ? <BiErrorCircle /> : <BiCheck />}</span>
                        <span>{info.message}</span>
                    </div>
                    {!info.error &&
                        <div className="flex justify-center">
                            <Link href="/login" className="mt-2 px-3 py-1 bg-cyan-600 rounded-sm text-white text-sm transition hover:bg-cyan-700">Login</Link>
                        </div>
                    }
                </ModalNonRouter>
            }

        </>
    )
}
