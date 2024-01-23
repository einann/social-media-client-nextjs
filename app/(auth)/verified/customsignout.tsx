"use client";

import { signOut } from "next-auth/react";

export default function customsignout() {
    const onManuelLogout = () => {
        signOut({
            callbackUrl: "/login",
        })
    }
    return (
        <button className="text-sky-500 font-bold hover:text-sky-600" onClick={onManuelLogout}>
            Login
        </button>
    )
}
