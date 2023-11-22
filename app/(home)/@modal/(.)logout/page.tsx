"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Modal from "@/app/components/Modal";

export default function Logout() {
    const router = useRouter();
    const handeClose = () => {
        router.back();
    }
    return (
        <Modal>
            <main className='bg-slate-300 rounded-md'>
                <div className="flex justify-between items-center border-b bg-slate-400 rounded-md">
                    <span className="ml-2 font-bold cursor-default p-2">Logging out...</span>
                </div>

                <div className="p-2">
                    <span>Are you sure you want to log out?</span>
                </div>

                <div className="flex flex-row p-1 gap-5 w-full justify-end">
                    <button className="px-3 py-1 bg-cyan-600 text-white text-sm rounded-md hover:bg-cyan-700" onClick={() => signOut()}>Confirm</button>
                    <button className="px-3 py-1 bg-pink-600 text-white text-sm rounded-md hover:bg-pink-700" onClick={handeClose}>Cancel</button>
                </div>

            </main>
        </Modal>
    )
}
