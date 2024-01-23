"use client";

import { signOut } from "next-auth/react";

export default function CustomLogout({ text }: { text: string }) {
    const handleSignOut = () => {
        signOut({
            callbackUrl: '/login',
        });
    }
    return (
        <button onClick={handleSignOut} className="text-sky-500 font-bold hover:text-sky-600">
            {text}
        </button>
    )
}
