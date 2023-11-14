"use client";

import Image from "next/image"
import DummyAvatar from '@/public/dummy_avatar.png';
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";

export default function ProfileButton() {
    const listRef = useRef<any>(null);
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);
    const togglePopover = () => {
        setIsPopoverVisible(!isPopoverVisible);
    }

    const handleClickOutside = (e: Event) => {
        if (listRef.current && !listRef.current.contains(e.target)) {
            setIsPopoverVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);


    return (
        <div className="relative">
            <button className='flex flex-row items-center hover:bg-slate-200 px-2 py-1 transition' onClick={togglePopover}>
                <Image
                    src={DummyAvatar}
                    alt="Avatar"
                    width={30}
                    height={30}
                    className='border rounded-full bg-emerald-700'
                />
                <p className='mx-1'>Ebubekir İnan</p>
                {isPopoverVisible ? <MdOutlineExpandLess className='text-lg' /> : <MdOutlineExpandMore className='text-lg' />}
            </button>
            {isPopoverVisible && <div ref={listRef}><ProfilePopover /></div>}
        </div>
    )
}

function ProfilePopover() {
    return (
        <div className="flex flex-col text-slate-600 md:absolute w-40 right-0 md:bg-cyan-100/25 text-center md:shadow-lg md:mt-1">
            <Link href="/profile" className="flex items-center justify-center gap-2 p-1 md:justify-start md:ml-1 md:hover:bg-cyan-100/50 md:transition">
                <CgProfile />
                <span>Profile</span>
            </Link>
            <Link href="/logout" className="flex items-center justify-center gap-2 p-1 md:justify-start md:ml-1 md:hover:bg-cyan-100/50 md:transition">
                <CgLogOut />
                <span>Logout</span>
            </Link>
        </div>
    )
}