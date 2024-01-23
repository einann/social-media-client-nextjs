"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { BiCheck, BiErrorCircle } from "react-icons/bi";
import ModalNonRouter from "./ModalNonRouter";

export default function ResendEmail() {
    const [isLoading, setIsLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [error, setError] = useState(false);
    const session = useSession();
    const onSendVerifyEmail = async () => {
        setIsLoading(true);
        const res = await fetch("http://localhost:3001/users/verify", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${session.data?.tokens.access_token}`,
                "Content-Type": "application/json"
            }
        });
        if (!res.ok) setError(true);
        setIsLoading(false);
        setIsDialogOpen(true);
    }

    const handleClose = () => {
        setIsDialogOpen(false);
    }

    return (
        <>
            <button
                disabled={isLoading}
                className="border w-1/4 p-1 self-center mt-2 rounded-md bg-sky-500 text-white hover:bg-sky-600 disabled:bg-sky-300 transition"
                onClick={onSendVerifyEmail}
            >
                {isLoading ? 'Processing...' : 'Resend E-Mail'}
            </button>

            {isDialogOpen &&
                <ModalNonRouter isOpen={isDialogOpen} close={handleClose}>
                    {error &&
                        <div className="flex items-center gap-5">
                            <span className="text-2xl text-pink-700"><BiErrorCircle /></span>
                            <span>An error occured, please try again later.</span>
                        </div>
                    }
                    {!error &&
                        <div className="flex items-center gap-5">
                            <span className="text-2xl text-teal-700"><BiCheck /></span>
                            <span>Mail sent successfully.</span>
                        </div>
                    }
                </ModalNonRouter>
            }

        </>
    )
}
