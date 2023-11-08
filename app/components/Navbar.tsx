import Link from 'next/link';
import ProfileButton from './ProfileButton';

export default function Navbar() {
    return (
        <nav className="flex flex-col md:flex-row items-center justify-center bg-slate-100 shadow-lg md:justify-between">
            <Link href="/" className='font-bold mb-2 ml-2 md:mb-0 text-cyan-700'>EINAN_SOCM</Link>
            <input type='text' className='rounded-md caret-cyan-600 text-cyan-800 px-2 mb-1 md:mb-0' /> {/* GEÇİCİ - Burası ayrı bir arama componenti olarak yazılacak */}
            <ProfileButton />
        </nav>
    )
}

// Mobilde sidebar olarak açılacak şekilde yapılacak.